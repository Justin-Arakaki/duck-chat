#!/bin/bash

# To run: cd to script > bash dbReset.sh

# Reading configuration from the config file
source ../db.conf

# Warning user
read -p "This script will delete and recreate database $db_name. Are you sure you want to proceed? (y/n): " choice

choice=$(echo "$choice" | tr '[:upper:]' '[:lower:]')

if [ "$choice" = "y" ]; then
  echo -e "\n Starting mysql..."

  # Sql scripts
  sqlDestroyDb="DROP SCHEMA IF EXISTS $db_name;"
  sqlCreateDb="CREATE DATABASE $db_name;"

  # Start mySQL
  sudo service mysql start

  # Destroy db
  echo -e "\nDestroying Database (if exists): [$db_name]"
  mysql --defaults-extra-file=../mysql.cnf -e "$sqlDestroyDb"
  if [ $? -eq 0 ]; then
    echo "Succeeded."
  else
    echo "Failed. Stopping."
    exit 1
  fi

  # Create db
  echo -e "\nCreating Database: [$db_name]"
  mysql --defaults-extra-file=../mysql.cnf -e "$sqlCreateDb"
  if [ $? -eq 1 ]; then
    echo "Failed. Stopping."
    exit 1
  fi
  mysql --defaults-extra-file=../mysql.cnf -D"$db_name" <init.sql
  if [ $? -eq 0 ]; then
    echo "Succeeded."
  else
    echo "Failed. Stopping."
    exit 1
  fi

  # Restart db
  echo -e "\n Restarting mysql..."
  sudo service mysql restart

  echo -e "\nSuccessfully reset database: [$db_name]!\n"
else
  echo -e "\nCancelled.\n"
fi
