#!/bin/bash

# Deploy to Surge.sh - работает в РФ
echo "Building project..."
pnpm build

echo "Deploying to Surge.sh..."
# Сначала на тестовый домен
npx surge dist jumarf-test.surge.sh

echo "Deploying to custom domains..."
npx surge dist jumarf.fun
npx surge dist jumarf.ru

echo "Deployment complete!"
echo "Site available at:"
echo "  - https://jumarf.fun"
echo "  - https://jumarf.ru"
echo "  - https://jumarf-test.surge.sh (backup)"
