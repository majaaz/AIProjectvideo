#!/bin/bash
# Run project tests

echo "Running tests..."
npm test 2>/dev/null || python -m pytest 2>/dev/null || echo "No test runner configured"
