#!/bin/bash

# Vercel deployment script for kusamahub-site

# Exit on error
set -e

# Check for --prod flag
PROD_FLAG=false
if [[ "$1" == "--prod" ]] || [[ "$1" == "-p" ]]; then
    PROD_FLAG=true
fi

echo "🚀 Starting Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Get current branch name
BRANCH_NAME=$(git branch --show-current)
echo "📌 Current branch: $BRANCH_NAME"

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Warning: You have uncommitted changes"
    read -p "Continue deployment? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Clean npm cache and remove lock files
echo "🧹 Cleaning npm cache and lock files..."
rm -rf node_modules package-lock.json
npm cache clean --force

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "☁️  Deploying to Vercel..."
if [ "$PROD_FLAG" = true ]; then
    # Force production deployment
    echo "🚀 Deploying to production (forced with --prod flag)..."
    vercel --prod
elif [ "$BRANCH_NAME" == "main" ] || [ "$BRANCH_NAME" == "master" ]; then
    # Production deployment for main/master branch
    echo "🚀 Deploying to production..."
    vercel --prod
else
    # Preview deployment
    echo "👁️  Creating preview deployment for branch: $BRANCH_NAME"
    vercel
fi

echo "✅ Deployment complete!"