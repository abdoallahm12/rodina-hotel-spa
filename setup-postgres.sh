#!/bin/bash
# PostgreSQL Setup Script for RODINA Hotel & SPA
# This script helps set up PostgreSQL for the hotel website

set -e

echo "=============================================="
echo "  RODINA Hotel & SPA - PostgreSQL Setup"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="rodina_hotel"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_HOST="localhost"
DB_PORT="5432"

# Check if psql is available
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✓${NC} PostgreSQL client found"
else
    echo -e "${RED}✗${NC} PostgreSQL not installed"
    echo ""
    echo "Please install PostgreSQL first:"
    echo "  Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "  macOS:         brew install postgresql@17"
    echo "  Windows:       Download from https://www.postgresql.org/download/"
    echo ""
    echo "Or use a cloud database:"
    echo "  Supabase:  https://supabase.com"
    echo "  Neon:      https://neon.tech"
    echo "  Railway:   https://railway.app"
    exit 1
fi

# Check if PostgreSQL is running
if pg_isready -h $DB_HOST -p $DB_PORT &> /dev/null; then
    echo -e "${GREEN}✓${NC} PostgreSQL is running on port $DB_PORT"
else
    echo -e "${YELLOW}!${NC} PostgreSQL is not running. Trying to start..."
    sudo service postgresql start 2>/dev/null || \
    sudo systemctl start postgresql 2>/dev/null || \
    pg_ctlcluster 17 main start 2>/dev/null || \
    echo -e "${YELLOW}Could not start PostgreSQL automatically${NC}"
    
    if pg_isready -h $DB_HOST -p $DB_PORT &> /dev/null; then
        echo -e "${GREEN}✓${NC} PostgreSQL started successfully"
    else
        echo -e "${RED}✗${NC} Could not start PostgreSQL"
        echo "Please start it manually and run this script again."
        exit 1
    fi
fi

# Create database and user
echo ""
echo "Setting up database..."

# Try to create the database (ignore error if it already exists)
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null && \
    echo -e "${GREEN}✓${NC} Database '$DB_NAME' created" || \
    echo -e "${YELLOW}!${NC} Database '$DB_NAME' already exists (that's OK)"

# Test connection
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1;" &> /dev/null; then
    echo -e "${GREEN}✓${NC} Connection to database '$DB_NAME' successful"
else
    echo -e "${RED}✗${NC} Could not connect to database"
    echo "You may need to set a password for the postgres user:"
    echo "  sudo -u postgres psql -c \"ALTER USER postgres PASSWORD 'postgres';\""
    exit 1
fi

# Run Prisma migrations
echo ""
echo "Running Prisma migrations..."
cd "$(dirname "$0")"

# Push schema to database
npx prisma db push --skip-generate 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Database schema applied successfully"
else
    echo -e "${RED}✗${NC} Failed to apply schema"
    exit 1
fi

# Generate Prisma client
npx prisma generate 2>&1

echo ""
echo "=============================================="
echo -e "${GREEN}  PostgreSQL setup complete!${NC}"
echo "=============================================="
echo ""
echo "Database URL: postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
echo ""
echo "To start the development server:"
echo "  bun run dev"
echo ""
echo "To access the admin dashboard:"
echo "  http://localhost:3000/admin-hotel"
echo "  Default password: admin2024"
