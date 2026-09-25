#!/usr/bin/env bash
# Build and publish the frontend on an Ubuntu EC2 box.
# Usage: bash deploy/deploy.sh
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_ROOT="/var/www/desiswad"

cd "$APP_DIR"
echo "==> Installing dependencies"
npm install

echo "==> Building"
npm run build

echo "==> Publishing to $WEB_ROOT"
sudo mkdir -p "$WEB_ROOT"
sudo rsync -a --delete "$APP_DIR/dist/" "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT"

echo "==> Reloading nginx"
sudo nginx -t
sudo systemctl reload nginx

echo "Done. Visit http://$(curl -s --max-time 3 ifconfig.me || echo '<EC2_PUBLIC_IP>')"
