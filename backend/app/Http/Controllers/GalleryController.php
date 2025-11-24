<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class GalleryController extends Controller
{
    public function index()
    {
        // Mengambil semua item galeri, diurutkan dari yang terbaru
        $galleries = Gallery::orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'galleries' => $galleries,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'category' => 'required',
            'status' => 'required',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif|max:5120',
        ]);

        $path = $request->file('image')->store('galeri-desa', 'public');

        $gallery = Gallery::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'status' => $request->status,
            'image_url' => $path,
            'uploaded_by' => $request->user()->id,
        ]);

        return response()->json($gallery, 201);
    }


    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $request->validate([
            'title' => 'required',
            'category' => 'required',
            'status' => 'required',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:5120',
        ]);

        // Jika user hapus gambar lama
        if ($request->has('image_url') && $request->image_url === '') {
            if ($gallery->image_url && file_exists(public_path($gallery->image_url))) {
                unlink(public_path($gallery->image_url));
            }
            $gallery->image_url = null;
        }

        // Upload file baru
        if ($request->hasFile('image')) {
            if ($gallery->image_url && file_exists(public_path($gallery->image_url))) {
                unlink(public_path($gallery->image_url));
            }

            $path = $request->file('image')->store('galeri-desa', 'public');
            $gallery->image_url = $path;
        }

        $gallery->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'status' => $request->status,
        ]);

        return response()->json($gallery);
    }

    
    // ... (metode delete)
}