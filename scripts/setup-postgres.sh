#!/bin/bash
# Initialize PostgreSQL for RODINA Hotel & SPA
# Run this once to set up the database
# Usage: bash scripts/setup-postgres.sh

PG_BIN="/home/z/.local/pg/usr/lib/postgresql/17/bin"
PGDATA="/home/z/my-project/.postgres/data"
DB_NAME="rodina_hotel"
DB_USER="z"

echo "=== RODINA Hotel & SPA - PostgreSQL Setup ==="

# Check if data directory already exists
if [ -d "$PGDATA" ] && [ -f "$PGDATA/PG_VERSION" ]; then
  echo "✓ PostgreSQL data directory already exists at $PGDATA"
else
  echo "Initializing PostgreSQL data directory..."
  mkdir -p "$PGDATA"
  "$PG_BIN/initdb" -D "$PGDATA" --auth=trust --username="$DB_USER"
  echo "✓ Data directory initialized"
fi

# Configure PostgreSQL
echo "Configuring PostgreSQL..."
echo "unix_socket_directories = '/tmp'" >> "$PGDATA/postgresql.conf"
echo "listen_addresses = 'localhost'" >> "$PGDATA/postgresql.conf"
echo "port = 5432" >> "$PGDATA/postgresql.conf"

# Start PostgreSQL
echo "Starting PostgreSQL..."
"$PG_BIN/pg_ctl" -D "$PGDATA" -l /home/z/my-project/.postgres/logfile start

# Wait for PostgreSQL to be ready
for i in $(seq 1 10); do
  if "$PG_BIN/pg_isready" -h /tmp -p 5432 2>/dev/null | grep -q "accepting connections"; then
    break
  fi
  sleep 1
done

# Create database if it doesn't exist
echo "Creating database $DB_NAME..."
"$PG_BIN/psql" -h /tmp -p 5432 -U "$DB_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
  "$PG_BIN/psql" -h /tmp -p 5432 -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME"

echo "✓ Database '$DB_NAME' is ready"

# Run Prisma migrations
echo "Running Prisma db push..."
cd /home/z/my-project
DATABASE_URL="postgresql://$DB_USER@localhost:5432/$DB_NAME" npx prisma db push

echo ""
echo "=== Setup Complete ==="
echo "PostgreSQL is running on localhost:5432"
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo ""
echo "To start PostgreSQL later, run: bash scripts/start-postgres.sh"
