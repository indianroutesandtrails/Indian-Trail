# apply-bilingual.ps1
# Applies {en,es} bilingual structure to tours.js using exact string matching.
# Run from project root: powershell -ExecutionPolicy Bypass -File scripts/apply-bilingual.ps1

$toursPath = Join-Path $PSScriptRoot "..\data\tours.js"
$text = [System.IO.File]::ReadAllText($toursPath, [System.Text.Encoding]::UTF8)

# ── Translation lookup (title field → Spanish) ─────────────────────
$titleMap = @{
  "Echoes of Empires: Delhi, Agra and Beyond"                           = "Ecos de imperios: Delhi, Agra y mas alla"
  "The Golden Triangle: Delhi, Agra & Jaipur"                           = "El Triangulo Dorado: Delhi, Agra y Jaipur"
  "The Royal Forts, Wilderness & Heritage Trail"                        = "El sendero de los fuertes reales, naturaleza y patrimonio"
  "Temples, Thrones & Holy Ghats"                                       = "Templos, tronos y ghats sagrados"
  "Echoes of Forts & Forests"                                           = "Ecos de fuertes y bosques"
  "Crowns, Citadel & Countryside"                                       = "Coronas, ciudadela y campina"
  "North India Unveiled: Rivers, Forts & Palaces"                       = "El norte de India al descubierto: rios, fuertes y palacios"
  "Coromandel to Coast: Temples, Backwaters & Spice Trails"             = "Del Coromandel a la costa: templos, remansos y rutas de especias"
  "The South Indian Tapestry: From Mumbai's Gateway to Karnataka's Palaces" = "El tapiz del sur de India: de la Puerta de Mumbai a los palacios de Karnataka"
  "Cultural Tapestry of India -- Alternate Route: Mumbai, Tamil Nadu, Kerala & Karnataka" = "El tapiz cultural de India - Ruta alternativa: Mumbai, Tamil Nadu, Kerala y Karnataka"
  "Enchanting South: Hills, Heritage & Coastlines -- Karnataka & Kerala" = "Sur encantador: colinas, patrimonio y costas - Karnataka y Kerala"
  "Sacred Shrines and Serene Waters: The Grand Southern Trail"           = "Santuarios sagrados y aguas serenas: el gran sendero del sur"
  "Empires of Stone & Sun-Kissed Shores: Hampi, Badami & Goa"          = "Imperios de piedra y orillas banadas por el sol: Hampi, Badami y Goa"
  "South India Wildlife, Hills & Backwaters Passage"                    = "Naturaleza, colinas y remansos del sur de India"
  "Deccan Monuments & Rock-Cut Sanctuaries Explorer"                    = "Explorador de monumentos del Decan y santuarios rupestres"
  "Crown of the West: Temples, Wildlife & Island Forts -- Mumbai & Gujarat" = "Corona del oeste: templos, fauna y fuertes insulares - Mumbai y Gujarat"
}

$replaced = 0

foreach ($en in $titleMap.Keys) {
  $es = $titleMap[$en]
  $old = "title: '$en'"
  $new = "title: { en: '$en', es: '$es' }"
  if ($text.Contains($old)) {
    $text = $text.Replace($old, $new)
    Write-Host "  Replaced title: $en"
    $replaced++
  } else {
    Write-Host "  NOT FOUND: $en"
  }
}

Write-Host ""
Write-Host "Titles replaced: $replaced"

# ── Verify ─────────────────────────────────────────────────────────
$biCount = ([regex]::Matches($text, "title: \{")).Count
Write-Host "Bilingual title fields now: $biCount"

# ── Write back clean UTF-8 ─────────────────────────────────────────
[System.IO.File]::WriteAllText($toursPath, $text, (New-Object System.Text.UTF8Encoding $false))
Write-Host "Written: $((Get-Item $toursPath).Length) bytes"
