<?php

// config/cors.php

return [
    /*
     * Harus berupa array, meskipun hanya ada satu path atau wildcard.
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie'], 

    /*
     * Harus berupa array.
     */
    'allowed_methods' => ['*'], 

    /*
     * Harus berupa array.
     */
    'allowed_origins' => [
        'http://localhost:5173', 
        'http://127.0.0.1:5173',
    ],

    /*
     * Harus berupa array.
     */
    'allowed_headers' => ['*'],

    /*
     * 🛑 PERHATIKAN BAGIAN INI: HARUS ARRAY atau FALSE (Tergantung versi Laravel)
     * Jika Anda hanya ingin mengizinkan default, gunakan `[]` (array kosong) atau `false`.
     */
    'exposed_headers' => [], // <-- HARUS ARRAY KOSONG [] jika Anda tidak mengekspos apa pun

    'max_age' => 0,

    'supports_credentials' => true,
];