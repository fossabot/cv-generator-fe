#!/usr/bin/env bash

# Disable the Datadog Agent based on dyno type
# # if [ "$DYNOTYPE" == "run" ]; then
#   DISABLE_DATADOG_AGENT="false"
# # fi

# Base Datadog Agent activity on New Relic activity state
DISABLE_DATADOG_AGENT="$NEW_RELIC_ENABLED"
echo [ NEW_RELIC_ENABLED: $NEW_RELIC_ENABLED ]
echo [ DISABLE_DATADOG_AGENT: $DISABLE_DATADOG_AGENT ]

# # Set app version based on HEROKU_SLUG_COMMIT
# if [ -n "$HEROKU_SLUG_COMMIT" ]; then
#   DD_VERSION=$HEROKU_SLUG_COMMIT
# fi
