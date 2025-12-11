<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Layanan Desa</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.3;
        }

        .container {
            padding: 0.7cm;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .content-body {
            flex: 1 1 auto;
        }

        .signature-section {
            margin-top: 30px;
        }

        .signature {
            width: 50%;
            text-align: center;
            float: right;
        }

        .qr-code {
            margin-top: 10px;
            height: 100px;
            width: 100px;
            margin-left: auto;
            margin-right: auto;
        }

        .signature-section::after {
            content: "";
            display: block;
            clear: both;
        }

        /* Kop mengikuti surat_tidak_mampu */
        .letterhead {
            position: relative;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 3px solid black;
            overflow: hidden;
        }

        .letterhead-logo {
            float: left;
            width: 90px;
            text-align: center;
            margin-top: 5px;
        }

        .letterhead-logo img {
            width: 80px;
            height: auto;
        }

        .letterhead-text {
            margin-left: 5px;
            text-align: center;
            padding-top: 0px;
        }

        .letterhead-text .lh1,
        .letterhead-text .lh2,
        .letterhead-text .lh3,
        .letterhead-text .addr {
            margin: 0;
            padding: 0;
            line-height: 1.3;
        }

        .lh1 { 
            font-size: 16pt; 
            font-weight: bold;
            letter-spacing: 1px;
        }
        
        .lh2 { 
            font-size: 16pt; 
            font-weight: bold;
            letter-spacing: 1px;
        }
        
        .lh3 { 
            font-size: 19pt; 
            font-weight: bold;
            letter-spacing: 2px;
            margin-top: 3px;
            margin-bottom: 3px;
        }

        .addr { 
            margin-left: 5px;
            font-size: 10pt;
            font-style: italic;
            letter-spacing: 0.8px;
        }
    </style>
</head>
<body>
<div class="container">
    @php
        $kadesName = $request['kades_name'] ?? config('app.kades_name', 'M. Agus Budiantoro, S.HI');
    @endphp

    <div class="letterhead">
        {!! $kop_html ?? '' !!}
    </div>
    <div class="kop-line-bold"></div>
    <div class="kop-line-thin"></div>

    <div class="content-body">
        {!! $body_html ?? '' !!}
    </div>

    <div class="signature-section">
        <div class="signature">
            <p>Fajar Baru, {{ \Carbon\Carbon::now()->isoFormat('D MMMM YYYY') }}</p>
            <p>Kepala Desa Fajar Baru</p>

            @if(!empty($qr_image_path) && file_exists($qr_image_path))
                @php
                    $qrImageData = base64_encode(file_get_contents($qr_image_path));
                @endphp
                <div class="qr-code">
                    <img src="data:image/png;base64,{{ $qrImageData }}" alt="QR Code" style="width:100px;height:100px;" />
                </div>
            @else
                <div style="height:100px;"></div>
            @endif

            <p style="margin-top:10px; font-weight:bold; text-decoration: underline;">({{ $kadesName }})</p>
        </div>
    </div>
</div>
</body>
</html>
