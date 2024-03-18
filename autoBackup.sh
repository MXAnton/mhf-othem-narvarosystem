#!/bin/bash

# Load environment variables from .env file
# Adjust the path if your .env file is located elsewhere
source .env

# Destination directory for backups
backup_dir="/home/anton/mhf-othem-narvaro_backups"

# Create the backup directory if it doesn't exist
mkdir -p "$backup_dir"

# Timestamp for the backup file
timestamp=$(date +%Y%m%d%H%M)

# Backup the MySQL database
mysqldump -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" > "$backup_dir/$DB_NAME-$timestamp.sql"

current_year=$(date +'%Y')
narvaro_table="narvaro_$current_year"
output_file="formattedNarvaro_$current_year.csv"

# Run SQL query to fetch data
echo "SET @sql = NULL;
SELECT
  GROUP_CONCAT(DISTINCT
    CONCAT(
      'MAX(CASE WHEN date = ''',
      date,
      ''' THEN TRUE ELSE FALSE END) AS ',
      CONCAT(REPLACE(date, '-', '_'))
    )
  ) INTO @sql
FROM "$narvaro_table";

SET @sql = CONCAT('SELECT personnummer, first_name AS förnamn, last_name AS efternamn, ', @sql, ' FROM "$narvaro_table" GROUP BY personnummer, first_name, last_name');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;" | \
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" | tr '\t' ';' > "$output_file"
