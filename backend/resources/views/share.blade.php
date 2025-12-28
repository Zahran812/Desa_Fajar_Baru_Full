<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? config('app.name') }}</title>

    {{-- Open Graph --}}
    <meta property="og:title" content="{{ $title ?? '' }}">
    <meta property="og:description" content="{{ $description ?? '' }}">
    <meta property="og:image" content="{{ $image ?? '' }}">
    <meta property="og:url" content="{{ $url ?? '' }}">
    <meta property="og:type" content="article">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title ?? '' }}">
    <meta name="twitter:description" content="{{ $description ?? '' }}">
    <meta name="twitter:image" content="{{ $image ?? '' }}">
    <meta name="twitter:url" content="{{ $url ?? '' }}">

    {{-- Fallback redirect for humans --}}
    @if(!empty($url))
        <meta http-equiv="refresh" content="0;url={{ $url }}">
        <link rel="canonical" href="{{ $url }}">
    @endif
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 2rem; background: #f5f5f5; color: #111; }
        .card { max-width: 640px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); overflow: hidden; }
        .image { width: 100%; height: 300px; object-fit: cover; background: #eee; display: block; }
        .content { padding: 1.5rem; }
        h1 { margin: 0 0 0.5rem; font-size: 1.4rem; }
        p { margin: 0 0 1rem; color: #444; }
        .link { display: inline-block; color: #0d9488; text-decoration: none; font-weight: 600; }
    </style>
</head>
<body>
    <div class="card">
        @if(!empty($image))
            <img src="{{ $image }}" alt="Gambar {{ $title ?? 'Berita' }}" class="image">
        @endif
        <div class="content">
            <h1>{{ $title ?? 'Berita' }}</h1>
            <p>{{ $description ?? '' }}</p>
            @if(!empty($url))
                <a class="link" href="{{ $url }}">Lihat selengkapnya</a>
            @endif
        </div>
    </div>

    <script>
      // Extra redirect for JS-enabled visitors
      (function() {
        var target = "{{ $url ?? '' }}";
        if (target) {
          window.location.replace(target);
        }
      })();
    </script>
</body>
</html>
