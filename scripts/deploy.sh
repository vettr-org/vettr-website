#!/bin/bash
set -e

DEPLOY_KEY_PATH="$1"
DEPLOY_HOST="$2"
DEPLOY_USER="$3"
DEPLOY_PATH="$4"

mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keyscan "$DEPLOY_HOST" >> ~/.ssh/known_hosts 2>/dev/null

rsync -avz \
  -e "ssh -i $DEPLOY_KEY_PATH -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=30" \
  --delete \
  ./ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"

echo "Deploy complete!"
