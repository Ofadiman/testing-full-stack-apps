#!/bin/bash

set -euo pipefail

volta install node@$(jq -r '.volta.node' package.json)
volta install pnpm@$(jq -r '.volta.pnpm' package.json)

exec "$@"
