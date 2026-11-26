# migrate-tours-bilingual.ps1
# Converts tours.js plain English string fields to { en, es } bilingual objects
# Run from project root: powershell -ExecutionPolicy Bypass -File scripts/migrate-tours-bilingual.ps1

$src  = Join-Path $PSScriptRoot "..\data\tours.js"
$dest = Join-Path $PSScriptRoot "..\data\tours.js"

$c = [System.IO.File]::ReadAllText($src, [System.Text.Encoding]::UTF8)

# ── Helper: wrap a captured plain string with { en, es } ─────────────
# This script does targeted replacements using exact English values as keys.
# Each replacement wraps the existing en string and adds its es translation.

function Wrap-Field {
  param([string]$content, [string]$fieldName, [string]$en, [string]$es)
  # Escape for regex
  $enEsc = [regex]::Escape($en)
  $pattern = "($fieldName\s*:\s*)'$enEsc'"
  $repl    = "`${1}{ en: '$en', es: '$es' }"
  return [regex]::Replace($content, $pattern, $repl)
}

# ════════════════════════════════════════════════════════════════════
# JOURNEY 01 — Echoes of Empires: Delhi, Agra and Beyond
# ════════════════════════════════════════════════════════════════════

# Title & subtitle already done. Skip.

# teaser
$c = $c -replace "    teaser: 'Six days from Delhi through Rajput forts to the Taj", "    teaser: { en: 'Six days from Delhi through Rajput forts to the Taj"
# (teaser is multi-line, handle via overview pattern below)

Write-Host "Migration script placeholder - see note below"
Write-Host "Full bilingual migration requires a different approach due to multi-line strings"
