param(
    [string]$PythonCmd = "python"
)

$ErrorActionPreference = "Stop"
$backendDir = $PSScriptRoot
$venvDir = Join-Path $backendDir ".venv"
$venvPython = Join-Path $venvDir "Scripts\python.exe"
$requirementsFile = Join-Path $backendDir "requirements.txt"
$ollamaModel = "mistral"
$requiredPython = "3.10.11"

Write-Host "[1/5] Moving to backend directory..."
Push-Location $backendDir

try {
    Write-Host "[1.1/5] Checking Python version..."
    $versionOutput = & $PythonCmd -c "import sys; print('.'.join(map(str, sys.version_info[:3])))"
    if ($versionOutput -ne $requiredPython) {
        throw "Python $requiredPython is required. Detected $versionOutput."
    }

    if (-not (Test-Path $venvPython)) {
        Write-Host "[2/5] Creating virtual environment at $venvDir ..."
        & $PythonCmd -m venv $venvDir
    } else {
        Write-Host "[2/5] Reusing existing virtual environment at $venvDir ..."
    }

    Write-Host "[3/5] Upgrading pip..."
    & $venvPython -m pip install --upgrade pip

    Write-Host "[4/5] Installing dependencies from requirements.txt..."
    if (-not (Test-Path $requirementsFile)) {
        throw "requirements.txt not found at $requirementsFile"
    }
    & $venvPython -m pip install -r $requirementsFile

    Write-Host "[4.1/5] Ensuring spaCy English model is available..."
    & $venvPython -m spacy download en_core_web_sm

    if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
        Write-Host "[4.2/5] ffmpeg not found. Attempting installation via winget..."
        if (Get-Command winget -ErrorAction SilentlyContinue) {
            winget install --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements
        } else {
            Write-Warning "winget not found. Please install ffmpeg manually and add it to PATH."
        }
    }

    if (-not (Get-Command ollama -ErrorAction SilentlyContinue)) {
        Write-Host "[4.3/5] Ollama not found. Attempting installation via winget..."
        if (Get-Command winget -ErrorAction SilentlyContinue) {
            winget install --id Ollama.Ollama -e --accept-source-agreements --accept-package-agreements
        } else {
            Write-Warning "winget not found. Please install Ollama manually from https://ollama.com/download"
        }
    }

    if (Get-Command ollama -ErrorAction SilentlyContinue) {
        Write-Host "[4.4/5] Starting Ollama service (if not already running)..."
        $ollamaRunning = Get-Process -Name "ollama" -ErrorAction SilentlyContinue
        if (-not $ollamaRunning) {
            Start-Process -FilePath "ollama" -ArgumentList "serve" -WindowStyle Hidden
            Start-Sleep -Seconds 2
        }

        Write-Host "[4.5/5] Pulling Ollama model '$ollamaModel' (if missing)..."
        & ollama pull $ollamaModel
    } else {
        Write-Warning "Ollama CLI still not found. /question endpoint will not work until Ollama is installed and running."
    }

    Write-Host "[5/5] Starting Flask backend (app.py)..."
    & $venvPython app.py
}
finally {
    Pop-Location
}
