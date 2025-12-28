<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

class ResidentController extends Controller
{
    public function index(Request $request)
    {
        $query = Resident::query()->with('dusun:id,name');

        if ($request->filled('dusun_id')) {
            $query->where('dusun_id', $request->integer('dusun_id'));
        }
        if ($request->filled('rt')) {
            $query->where('rt', $request->input('rt'));
        }
        if ($request->filled('gender')) {
            $query->where('jenis_kelamin', $request->input('gender'));
        }
        if ($request->filled('search')) {
            $search = strtolower($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->whereRaw('LOWER(nama_lengkap) LIKE ?', ['%' . $search . '%'])
                    ->orWhere('nik', 'like', '%' . $search . '%')
                    ->orWhereRaw('LOWER(alamat) LIKE ?', ['%' . $search . '%']);
            });
        }

        $perPage = min($request->integer('per_page', 100), 500);

        return response()->json(
            $query->paginate($perPage)
        );
    }

    public function store(Request $request)
    {
        $validated = $this->validateRow($request);

        $resident = Resident::create($validated);

        return response()->json($resident->load('dusun:id,name'), Response::HTTP_CREATED);
    }

    public function update(Request $request, Resident $resident)
    {
        $validated = $this->validateRow($request, $resident->id);

        $resident->fill($validated);
        $resident->save();

        return response()->json($resident->load('dusun:id,name'));
    }

    public function destroy(Resident $resident)
    {
        $resident->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function import(Request $request)
    {
        $validated = $request->validate([
            'dusun_id' => ['required', 'exists:dusuns,id'],
            'rows' => ['required', 'array', 'min:1'],
            // longgarkan: izinkan nik/nama kosong, nanti disaring
            'rows.*.nik' => ['nullable', 'string'],
            'rows.*.nama_lengkap' => ['nullable', 'string'],
        ]);

        // Gunakan input mentah supaya kolom lain tidak terbuang oleh validate()
        $rawRows = $request->input('rows', []);

        $rows = collect($rawRows)
            ->map(function ($row) use ($validated) {
                $data = $this->mapRow($row);
                $data['dusun_id'] = $validated['dusun_id'];
                return $data;
            })
            // hanya simpan baris yang punya nik dan nama_lengkap
            ->filter(fn ($row) => !empty($row['nik']) && !empty($row['nama_lengkap']))
            ->values();

        // Upsert by nik for idempotency
        $chunks = $rows->chunk(500);
        foreach ($chunks as $chunk) {
            Resident::upsert(
                $chunk->toArray(),
                ['nik'],
                [
                    'dusun_id',
                    'no_kk',
                    'nama_lengkap',
                    'jenis_kelamin',
                    'tempat_lahir',
                    'tanggal_lahir',
                    'umur',
                    'alamat',
                    'rt',
                    'rw',
                    'agama',
                    'pendidikan_terakhir',
                    'pekerjaan',
                    'golongan_darah',
                    'status_perkawinan',
                    'status_dalam_keluarga',
                    'status_hubungan_dalam_keluarga',
                    'nama_ayah',
                    'nama_ibu',
                    'phone',
                    'updated_at',
                ]
            );
        }

        return response()->json(['message' => 'Import berhasil', 'imported' => $rows->count()]);
    }

    private function validateRow(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'dusun_id' => ['required', 'exists:dusuns,id'],
            'nik' => [
                'required',
                'string',
                Rule::unique('residents', 'nik')->ignore($ignoreId),
            ],
            'no_kk' => ['nullable', 'string'],
            'nama_lengkap' => ['required', 'string'],
            'jenis_kelamin' => ['nullable', 'string'],
            'tempat_lahir' => ['nullable', 'string'],
            'tanggal_lahir' => ['nullable', 'date'],
            'umur' => ['nullable', 'integer', 'min:0'],
            'alamat' => ['nullable', 'string'],
            'rt' => ['nullable', 'string'],
            'rw' => ['nullable', 'string'],
            'agama' => ['nullable', 'string'],
            'pendidikan_terakhir' => ['nullable', 'string'],
            'pekerjaan' => ['nullable', 'string'],
            'golongan_darah' => ['nullable', 'string'],
            'status_perkawinan' => ['nullable', 'string'],
            'status_dalam_keluarga' => ['nullable', 'string'],
            'status_hubungan_dalam_keluarga' => ['nullable', 'string'],
            'nama_ayah' => ['nullable', 'string'],
            'nama_ibu' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
        ]);
    }

    private function mapRow(array $row): array
    {
        $tanggal = $this->parseDate($row['tanggal_lahir'] ?? null);

        return [
            'nik' => $row['nik'] ?? '',
            'no_kk' => $row['no_kk'] ?? ($row['no_kk'] ?? null),
            'nama_lengkap' => $row['nama_lengkap'] ?? '',
            'jenis_kelamin' => $row['jenis_kelamin'] ?? null,
            'tempat_lahir' => $row['tempat_lahir'] ?? null,
            'tanggal_lahir' => $tanggal,
            'umur' => $row['umur'] ?? null,
            'alamat' => $row['alamat'] ?? null,
            'rt' => $row['rt'] ?? null,
            'rw' => $row['rw'] ?? null,
            'agama' => $row['agama'] ?? null,
            'pendidikan_terakhir' => $row['pendidikan_terakhir'] ?? null,
            'pekerjaan' => $row['pekerjaan'] ?? null,
            'golongan_darah' => $row['golongan_darah'] ?? null,
            'status_perkawinan' => $row['status_perkawinan'] ?? null,
            'status_dalam_keluarga' => $row['status_dalam_keluarga'] ?? ($row['status_hubungan_dalam_keluarga'] ?? null),
            'status_hubungan_dalam_keluarga' => $row['status_hubungan_dalam_keluarga'] ?? null,
            'nama_ayah' => $row['nama_ayah'] ?? null,
            'nama_ibu' => $row['nama_ibu'] ?? null,
            'phone' => $row['phone'] ?? ($row['no_telepon'] ?? null),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    private function parseDate(?string $value): ?string
    {
        if (!$value) {
            return null;
        }

        try {
            // Try common formats: d-m-Y, Y-m-d
            if (str_contains($value, '-')) {
                $parts = explode('-', $value);
                if (strlen($parts[0]) === 4) {
                    return Carbon::createFromFormat('Y-m-d', $value)->format('Y-m-d');
                }
                if (strlen($parts[2]) === 4) {
                    return Carbon::createFromFormat('d-m-Y', $value)->format('Y-m-d');
                }
            }
            return Carbon::parse($value)->format('Y-m-d');
        } catch (\Throwable $e) {
            return null;
        }
    }
}
