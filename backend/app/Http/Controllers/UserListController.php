<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserListController extends Controller
{
    public function index()
    {
        // Pending Users
        $pending = User::with('citizen')
            ->where('role', 'citizen')
            ->where('status', 'pending')
            ->get()
            ->map(fn ($u) => $this->formatUser($u));

        // Dusun Heads
        $dusunHeads = User::where('role', 'dusun_head')
            ->get()
            ->map(fn ($u) => $this->formatUser($u));

        // Active Citizens
        $citizens = User::with('citizen')
            ->where('role', 'citizen')
            ->where('status', 'active')
            ->get()
            ->map(fn ($u) => $this->formatUser($u));

        return response()->json([
            'pending_users' => $pending,
            'dusun_heads'   => $dusunHeads,
            'citizens'      => $citizens
        ]);
    }

    private function formatUser($u)
    {
        // $c akan null jika relasi citizen tidak ada (dusun_head)
        $c = $u->citizen;

        return [
            "id"              => $u->id,
            "username"        => $u->username,
            "email"           => $u->email,

            // 🟢 PERBAIKAN: Ambil dari $u (User) jika $c (Citizen) tidak ada.
            // Jika $c ada, ambil dari $c. Jika $c tidak ada, ambil dari $u.
            // Data di $u (seperti full_name, rt_number, address) hanya diisi untuk non-citizen/dusun_head.
            "full_name"       => $c->full_name ?? $u->full_name ?? null, 
            "role"            => $u->role,
            "status"          => $u->status,
            "rt_number"       => $c->rt_number ?? $u->rt_number ?? null,
            "rw_number"       => $c->rw_number ?? null, // RW Number tidak ada di tabel User
            "phone"           => $u->phone,
            "address"         => $c->address ?? $u->address ?? null,

            "created_at"      => $u->created_at?->toISOString(),

            // citizen detail (tetap ambil dari $c karena detail ini hanya ada di tabel citizens)
            "ktp_image_url"   => $u->ktp_image_url ?? null,
            "nik"             => $c->nik ?? null,
            // ... semua detail citizen lainnya tetap menggunakan $c->property ?? null
            "dusun"           => $c->dusun ?? null, 
            "village"         => $c->village ?? null,
            // ...
        ];
    }
}
