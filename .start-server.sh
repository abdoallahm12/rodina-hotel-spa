#!/bin/bash
export DATABASE_URL="postgresql://z@localhost:5432/rodina_hotel"
cd /home/z/my-project
exec npx next dev -p 3000
