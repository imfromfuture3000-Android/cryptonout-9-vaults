#!/bin/bash
set -e

echo "🚀 Starting deployment..."

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "❌ No .env file found."
  exit 1
fi

solana config set --url $RPC_URL
solana config set --keypair $WALLET_KEYPAIR

anchor build
anchor deploy --provider.cluster $SOLANA_CLUSTER

PROGRAM_ID=$(solana address -k target/deploy/*.json)
echo "✅ Program deployed with ID: $PROGRAM_ID"

node scripts/generate_pdas.js $PROGRAM_ID

echo "🌌 Deployment complete!"
