<?php

namespace App\Http\Controllers;

use App\Models\ChatCategory;
use App\Models\ChatMessage;
use App\Models\ChatThread;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ChatController extends Controller
{
    public function categories()
    {
        return response()->json([
            'data' => ChatCategory::query()->orderBy('id')->get(['id', 'key', 'label']),
        ]);
    }

    private function getDefaultOperatorId(): int
    {
        $operator = User::query()->where('role', 'operator')->orderBy('id')->first();
        return (int) ($operator?->id ?? 1);
    }

    public function threads(Request $request)
    {
        $user = $request->user();

        $query = ChatThread::query()
            ->with(['category:id,key,label', 'citizen:id,full_name,role', 'operator:id,full_name,role'])
            ->withMax('messages', 'id')
            ->when($user->role === 'citizen', fn ($q) => $q->where('citizen_user_id', $user->id))
            ->when($user->role === 'operator', fn ($q) => $q->where('operator_user_id', $user->id))
            ->orderByDesc('updated_at');

        $threads = $query->paginate(20);

        $threadIds = collect($threads->items())->pluck('id');

        $lastMessages = ChatMessage::query()
            ->whereIn('chat_thread_id', $threadIds)
            ->orderByDesc('id')
            ->get()
            ->groupBy('chat_thread_id')
            ->map(fn ($msgs) => $msgs->first());

        $data = collect($threads->items())->map(function (ChatThread $t) use ($lastMessages, $user) {
            $last = $lastMessages->get($t->id);

            $lastReadAt = $user->role === 'citizen' ? $t->citizen_last_read_at : $t->operator_last_read_at;

            $unreadCount = ChatMessage::query()
                ->where('chat_thread_id', $t->id)
                ->when($lastReadAt, fn ($q) => $q->where('created_at', '>', $lastReadAt))
                ->where('sender_user_id', '!=', $user->id)
                ->count();

            return [
                'id' => $t->id,
                'subject' => $t->subject,
                'category' => $t->category,
                'citizen' => $t->citizen,
                'operator' => $t->operator,
                'updated_at' => $t->updated_at,
                'last_message' => $last ? [
                    'id' => $last->id,
                    'sender_user_id' => $last->sender_user_id,
                    'content' => $last->content,
                    'created_at' => $last->created_at,
                ] : null,
                'unread_count' => $unreadCount,
            ];
        });

        return response()->json([
            'data' => $data,
            'meta' => [
                'current_page' => $threads->currentPage(),
                'last_page' => $threads->lastPage(),
                'per_page' => $threads->perPage(),
                'total' => $threads->total(),
            ],
        ]);
    }

    public function createThread(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'citizen') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'chat_category_id' => ['required', 'integer', 'exists:chat_categories,id'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:50000'],
        ]);

        $operatorId = $this->getDefaultOperatorId();

        $thread = ChatThread::query()->firstOrCreate([
            'citizen_user_id' => $user->id,
            'operator_user_id' => $operatorId,
            'chat_category_id' => $data['chat_category_id'],
            'subject' => $data['subject'],
        ], [
            'citizen_last_read_at' => now(),
        ]);

        $msg = ChatMessage::query()->create([
            'chat_thread_id' => $thread->id,
            'sender_user_id' => $user->id,
            'content' => $data['message'],
        ]);

        $thread->touch();

        return response()->json([
            'thread' => $thread->load(['category:id,key,label', 'citizen:id,full_name,role', 'operator:id,full_name,role']),
            'message' => $msg,
        ], 201);
    }

    public function messages(Request $request, ChatThread $thread)
    {
        $user = $request->user();

        if ($user->id !== $thread->citizen_user_id && $user->id !== $thread->operator_user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $perPage = (int) $request->query('per_page', 30);
        $perPage = max(10, min(100, $perPage));

        $messages = ChatMessage::query()
            ->where('chat_thread_id', $thread->id)
            ->orderByDesc('id')
            ->paginate($perPage);

        return response()->json([
            'data' => collect($messages->items())->reverse()->values(),
            'meta' => [
                'current_page' => $messages->currentPage(),
                'last_page' => $messages->lastPage(),
                'per_page' => $messages->perPage(),
                'total' => $messages->total(),
            ],
        ]);
    }

    public function sendMessage(Request $request, ChatThread $thread)
    {
        $user = $request->user();

        if ($user->id !== $thread->citizen_user_id && $user->id !== $thread->operator_user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'content' => ['required', 'string', 'max:50000'],
        ]);

        $msg = ChatMessage::query()->create([
            'chat_thread_id' => $thread->id,
            'sender_user_id' => $user->id,
            'content' => $data['content'],
        ]);

        $thread->touch();

        return response()->json([
            'message' => $msg,
        ], 201);
    }

    public function markRead(Request $request, ChatThread $thread)
    {
        $user = $request->user();

        if ($user->id !== $thread->citizen_user_id && $user->id !== $thread->operator_user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($user->role === 'citizen') {
            $thread->citizen_last_read_at = now();
        } else {
            $thread->operator_last_read_at = now();
        }
        $thread->save();

        return response()->json(['ok' => true]);
    }
}
