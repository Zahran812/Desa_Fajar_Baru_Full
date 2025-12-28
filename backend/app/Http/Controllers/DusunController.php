<?php

namespace App\Http\Controllers;

use App\Models\Dusun;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class DusunController extends Controller
{
    public function index()
    {
        $dusuns = Dusun::with(['dusunHead:id,full_name,phone'])->get();

        return response()->json($dusuns);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:dusuns,name'],
            'dusun_head_user_id' => ['nullable', 'exists:users,id'],
            'rt_count' => ['nullable', 'integer', 'min:0'],
            'population_count' => ['nullable', 'integer', 'min:0'],
            'male_count' => ['nullable', 'integer', 'min:0'],
            'female_count' => ['nullable', 'integer', 'min:0'],
        ]);

        if (isset($validated['dusun_head_user_id'])) {
            $this->ensureUserIsDusunHead($validated['dusun_head_user_id']);
        }

        $dusun = Dusun::create($validated);

        return response()->json($dusun->load('dusunHead:id,full_name,phone'), Response::HTTP_CREATED);
    }

    public function update(Request $request, Dusun $dusun)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('dusuns', 'name')->ignore($dusun->id)],
            'dusun_head_user_id' => ['nullable', 'exists:users,id'],
            'rt_count' => ['nullable', 'integer', 'min:0'],
            'population_count' => ['nullable', 'integer', 'min:0'],
            'male_count' => ['nullable', 'integer', 'min:0'],
            'female_count' => ['nullable', 'integer', 'min:0'],
        ]);

        if (array_key_exists('dusun_head_user_id', $validated) && $validated['dusun_head_user_id']) {
            $this->ensureUserIsDusunHead($validated['dusun_head_user_id']);
        }

        $dusun->fill($validated);
        $dusun->save();

        return response()->json($dusun->load('dusunHead:id,full_name,phone'));
    }

    public function destroy(Dusun $dusun)
    {
        $dusun->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    private function ensureUserIsDusunHead(int $userId): void
    {
        $user = User::findOrFail($userId);
        if ($user->role !== 'dusun_head') {
            abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'User harus berperan dusun_head');
        }
    }
}
