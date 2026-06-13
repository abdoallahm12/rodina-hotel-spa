#!/bin/bash
# Start PostgreSQL for RODINA Hotel & SPA
# Usage: bash scripts/start-postgres.sh

PG_BIN="/home/z/.local/pg/usr/lib/postgresql/17/bin"
PGDATA="/home/z/my-project/.postgres/data"
PGHOST="/tmp"
PGPORT=5432
PGUSER="z"

# Check if PostgreSQL is already running
if "$PG_BIN/pg_ctl" -D "$PGDATA" status 2>/dev/null | grep -q "server is running"; then
  echo "✓ PostgreSQL is already running on port $PGPORT"
  exit 0
fi

# Start PostgreSQL
echo "Starting PostgreSQL..."
"$PG_BIN/pg_ctl" -D "$PGDATA" -l /home/z/my-project/.postgres/logfile start

# Wait for it to be ready
for i in $(seq 1 10); do
  if "$PG_BIN/pg_isready" -h "$PGHOST" -p "$PGPORT" 2>/dev/null | grep -q "accepting connections"; then
    echo "✓ PostgreSQL is ready on port $PGPORT"
    exit 0
  fi
  sleep 1
done

echo "✗ Failed to start PostgreSQL"
exit 1
