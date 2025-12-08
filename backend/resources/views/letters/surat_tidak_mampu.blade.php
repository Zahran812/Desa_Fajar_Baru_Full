<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Keterangan Tidak Mampu</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.3; /* stabil untuk TCPDF */
        }

        .container {
            padding: 0.7cm;
        }

        .text-center { text-align: center; }
        .text-justify { text-align: justify; }
        .bold { font-weight: bold; }
        .underline { text-decoration: underline; }

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

        .letter-title {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .data-table {
            margin-left: 40px;
            margin-top: 15px;
            margin-bottom: 15px;
            width: 100%;
        }

        .data-table td {
            padding-bottom: 3px;
        }

        .signature-section {
            margin-top: 40px;
        }

        .signature {
            width: 40%;
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
    </style>
</head>

<body>
<div class="container">

    <!-- Letterhead -->
    <div class="letterhead">
        <div class="letterhead-logo">
            @php
                $kopPath = public_path('kop/kabupaten.png');
            @endphp
            @if(file_exists($kopPath))
                @php
                    $kopData = base64_encode(file_get_contents($kopPath));
                @endphp
                <img src="data:image/png;base64,{{ $kopData }}" alt="Logo Kabupaten" />
            @endif
        </div>
        <div class="letterhead-text">
            <div class="lh1">PEMERINTAH KABUPATEN LAMPUNG SELATAN</div>
            <div class="lh1">KECAMATAN JATI AGUNG</div>
            <div class="lh3">DESA FAJAR BARU</div>
            <div class="addr">JL. RA. BASYID No. 1 FAJAR BARU  35564</div>
        </div>
    </div>

    <!-- Title -->
    <div class="letter-title">
        <div class="bold underline" style="font-size: 14pt;">SURAT KETERANGAN TIDAK MAMPU</div>
        <div>Nomor: {{ $letter_number ?? '....................' }}</div>
    </div>

    <!-- Body -->
    <p class="text-justify">
        Yang bertanda tangan di bawah ini Kepala Desa Fajar Baru, Kecamatan Jati Agung, Kabupaten Lampung Selatan, dengan ini
        menerangkan bahwa:
    </p>

    <table class="data-table">
        <tbody>
        <tr>
            <td style="width:30%;">Nama</td><td style="width:5%;">:</td>
            <td class="bold">{{ $citizen['nama'] ?? '.........................' }}</td>
        </tr>

        <tr>
            <td>NIK</td><td>:</td>
            <td>{{ $citizen['nik'] ?? '.........................' }}</td>
        </tr>

        <tr>
            <td>Tempat/Tgl. Lahir</td><td>:</td>
            <td>
                {{ $citizen['tempat_lahir'] ?? '................' }},
                {{ $citizen['tanggal_lahir'] ? \Carbon\Carbon::parse($citizen['tanggal_lahir'])->isoFormat('D MMMM YYYY') : '................' }}
            </td>
        </tr>

        <tr>
            <td>Jenis Kelamin</td><td>:</td>
            <td>{{ $citizen['jenis_kelamin'] ?? '.........................' }}</td>
        </tr>

        <tr>
            <td>Agama</td><td>:</td>
            <td>{{ $citizen['agama'] ?? '.........................' }}</td>
        </tr>

        <tr>
            <td>Pekerjaan</td><td>:</td>
            <td>{{ $citizen['pekerjaan'] ?? '.........................' }}</td>
        </tr>

        <tr>
            <td style="vertical-align: top;">Alamat</td><td style="vertical-align: top;">:</td>
            <td>{{ $citizen['alamat'] ?? '.........................' }}</td>
        </tr>
        </tbody>
    </table>

    <p class="text-justify">
        Berdasarkan pengamatan kami dan data yang ada, yang bersangkutan adalah benar warga Desa Fajar Baru dan tergolong dalam keluarga yang tidak mampu.
    </p>

    <p class="text-justify">
        Surat keterangan ini dibuat untuk keperluan {{ $request['description'] ?? '.........................' }}.
    </p>

    <p class="text-justify">
        Demikian Surat Keterangan Tidak Mampu ini dibuat untuk dapat dipergunakan sebagaimana mestinya.
    </p>

    <!-- Signature -->
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

            <p class="bold underline" style="margin-top:10px;">(M. Agus Budiantoro, S.HI)</p>
        </div>
    </div>

</div>
</body>
</html>
