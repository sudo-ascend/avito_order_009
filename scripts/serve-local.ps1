$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$node = 'C:\Program Files\nodejs\node.exe'
$vite = Join-Path $projectRoot 'node_modules\vite\bin\vite.js'

Set-Location $projectRoot
& $node $vite $projectRoot --host 127.0.0.1 --port 4173
