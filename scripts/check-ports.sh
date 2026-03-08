#!/bin/bash
# Проверка занятых портов на сервере
# Запуск: bash check-ports.sh

echo "=== Слушающие порты (ss) ==="
ss -tlnp 2>/dev/null || true

echo ""
echo "=== Или через netstat ==="
netstat -tlnp 2>/dev/null || netstat -tln 2>/dev/null || true

echo ""
echo "=== Docker контейнеры и их порты ==="
docker ps -a --format "table {{.Names}}\t{{.Ports}}" 2>/dev/null || true
