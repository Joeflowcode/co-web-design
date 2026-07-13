# Executive OS — one-command Windows setup
# Run from anywhere in PowerShell:
#   irm https://raw.githubusercontent.com/Joeflowcode/co-web-design/cursor/ai-executive-team-c0c3/scripts/setup-windows.ps1 | iex
# Or, after cloning:
#   powershell -ExecutionPolicy Bypass -File .\scripts\setup-windows.ps1

$ErrorActionPreference = "Stop"
$ProjectDir = Join-Path $HOME "co-web-design"
$Branch = "cursor/ai-executive-team-c0c3"
$RepoUrl = "https://github.com/Joeflowcode/co-web-design.git"

Write-Host ""
Write-Host "Executive OS — Windows Setup" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js not found. Install from https://nodejs.org (v20+)" -ForegroundColor Red
    exit 1
}
Write-Host "Node: $(node -v)" -ForegroundColor Green

# Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git not found. Install from https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# Clone or update
if (-not (Test-Path $ProjectDir)) {
    Write-Host "Cloning repo to $ProjectDir ..." -ForegroundColor Yellow
    git clone $RepoUrl $ProjectDir
} else {
    Write-Host "Project folder exists: $ProjectDir" -ForegroundColor Green
}

Set-Location $ProjectDir

Write-Host "Checking out branch $Branch ..." -ForegroundColor Yellow
git fetch origin $Branch 2>$null
git checkout $Branch 2>$null
if ($LASTEXITCODE -ne 0) {
    git checkout main 2>$null
    Write-Host "Using main branch (feature branch may not exist yet)" -ForegroundColor Yellow
}

if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found in $ProjectDir" -ForegroundColor Red
    exit 1
}

Write-Host "Installing dependencies (this may take a minute) ..." -ForegroundColor Yellow
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) { exit 1 }

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env from .env.example" -ForegroundColor Green
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Starting dev server at http://localhost:3000" -ForegroundColor Cyan
Write-Host "Keep this window open. Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

npm run dev
