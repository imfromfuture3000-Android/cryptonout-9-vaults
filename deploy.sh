cat << 'EOF' > deploy.sh
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Use GitHub Actions environment variables instead of .env
if [ -z "$RPC_URL" ] || [ -z "$SOLANA_CLUSTER" ] || [ -z "$WALLET_KEYPAIR" ]; then
  echo "❌ Missing RPC_URL, SOLANA_CLUSTER, or WALLET_KEYPAIR environment variables."
  exit 1
fi

solana config set --url $RPC_URL
solana config set --keypair $WALLET_KEYPAIR

echo "🔨 Building Anchor program..."
anchor build

echo "📦 Deploying program..."
anchor deploy --provider.cluster $SOLANA_CLUSTER

PROGRAM_ID=$(solana address -k target/deploy/*.json)
echo "✅ Program deployed with ID: $PROGRAM_ID"

echo "🔑 Generating PDAs for 9 vaults..."
node scripts/generate_pdas.js $PROGRAM_ID

echo "🌌 Deployment complete!"
EOF
