<?php

// Prepare writeable storage directory structures on Vercel's read-only file system
$storageDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/bootstrap/cache',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// Force the view compiled path to use the writeable temp directory
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');

// Forward the request to Laravel's public entrypoint and catch any bootstrap exceptions
try {
    require __DIR__ . '/../public/index.php';
} catch (\Throwable $e) {
    error_log('!!! BOOTSTRAP EXCEPTION: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    error_log($e->getTraceAsString());
    throw $e;
}
