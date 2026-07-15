#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-5173}"

echo ""
echo "⏳ Creando túnel hacia http://127.0.0.1:${PORT} ..."
echo "   (Asegúrate de tener npm run share en otra terminal)"
echo ""

npx cloudflared tunnel --url "http://127.0.0.1:${PORT}" 2>&1 | while IFS= read -r line; do
  echo "$line"
  if [[ "$line" == *"trycloudflare.com"* ]]; then
    url=$(echo "$line" | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | head -1)
    if [[ -n "$url" ]]; then
      echo ""
      echo "══════════════════════════════════════════════════"
      echo "  COMPARTE ESTE LINK:"
      echo "  $url"
      echo "══════════════════════════════════════════════════"
      echo ""
    fi
  fi
done
