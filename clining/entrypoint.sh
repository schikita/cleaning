#!/bin/sh
set -e
# Если public пустой (volume при первом запуске) — копируем статику по умолчанию
if [ ! -f /app/public/favicon.ico ] && [ ! -f /app/public/favicon.png ]; then
  cp -r /app/public-default/. /app/public/ 2>/dev/null || true
fi
chown -R nextjs:nodejs /app/public 2>/dev/null || true
exec su-exec nextjs node server.js
