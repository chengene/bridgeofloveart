$folder = 'C:\Github\bridgeofloveart'
$prefix = 'http://127.0.0.1:8000/'
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Serving on $prefix"
Write-Host "Press Ctrl+C to stop."
while ($true) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $relative = $request.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrEmpty($relative)) { $relative = 'index.html' }
    $full = Join-Path $folder $relative
    if (Test-Path $full -PathType Leaf) {
        $bytes = [IO.File]::ReadAllBytes($full)
        switch ([IO.Path]::GetExtension($full).ToLowerInvariant()) {
            '.html' { $response.ContentType = 'text/html' }
            '.htm' { $response.ContentType = 'text/html' }
            '.css' { $response.ContentType = 'text/css' }
            '.js' { $response.ContentType = 'application/javascript' }
            '.json' { $response.ContentType = 'application/json' }
            '.png' { $response.ContentType = 'image/png' }
            '.jpg' { $response.ContentType = 'image/jpeg' }
            '.jpeg' { $response.ContentType = 'image/jpeg' }
            '.gif' { $response.ContentType = 'image/gif' }
            '.svg' { $response.ContentType = 'image/svg+xml' }
            default { $response.ContentType = 'application/octet-stream' }
        }
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    else {
        $response.StatusCode = 404
        $buf = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
        $response.ContentType = 'text/plain'
        $response.ContentLength64 = $buf.Length
        $response.OutputStream.Write($buf, 0, $buf.Length)
    }
    $response.OutputStream.Close()
}
