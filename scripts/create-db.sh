#!/bin/bash
echo "Starting database setup..."
sudo mysql -u root -p < create-db.sql
if [ $? -eq 0 ]; then
  echo "Database setup completed successfully."
  echo "- Database 'tesla-tr-inventory-checker' created"
  echo "- User 'admin' created and granted permissions"
else
  echo "Error setting up database."
fi
