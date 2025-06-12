#!/bin/bash

# Build the TypeScript code
echo "Building TypeScript code..."
npm run build

# Make sure the uploads and data directories exist
mkdir -p uploads
mkdir -p data

# Copy views to dist folder
echo "Copying views to dist folder..."
mkdir -p dist/views
cp -r src/views/* dist/views/

# Create public directory if it doesn't exist
mkdir -p public

echo "Build completed successfully!"
echo "You can now start the application with: npm run pm2:start" 