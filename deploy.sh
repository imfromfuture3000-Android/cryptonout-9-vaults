#!/bin/bash
set -e  # Exit on error

echo "🚀 Starting Solana program deployment..."

# Check if anchor is installed
if ! command -v anchor &> /dev/null; then
  echo "❌ Error: Anchor CLI not found. Please install it."
  exit 1
fi

# Deploy to devnet (change to mainnet-beta if needed)
echo "📡 Deploying to Solana Devnet..."
anchor deploy --provider.cluster devnet

echo "✅ Deployment completed!"
