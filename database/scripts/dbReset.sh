#!/bin/bash

# To run: cd to script > bash dbReset.sh

# Reading configuration from the config file
source ../db.conf

# Warning user
read -p "This script will delete and recreate database $db_name. Are you sure you want to proceed? (y/n): " choice

choice=$(echo "$choice" | tr '[:upper:]' '[:lower:]')

if [ "$choice" = "y" ]; then
  echo "Starting process on database $db_name..."

  # Sql scripts
  sqlDestroyDb="DROP SCHEMA IF EXISTS $db_name;"
  sqlCreateDb="CREATE DATABASE $db_name;"

  # Start mySQL
  sudo service mysql start

  # Destroy db
  echo "Destroying Database (if exists): $db_name"
  mysql --defaults-extra-file=../mysql.cnf -e "$sqlDestroyDb"

  # Create db
  echo "Creating Database: $db_name"
  mysql --defaults-extra-file=../mysql.cnf -e "$sqlCreateDb"
  mysql --defaults-extra-file=../mysql.cnf -D"$db_name" < init.sql

  # Restart db
  sudo service mysql restart
else
  echo "Canceled."
fi
