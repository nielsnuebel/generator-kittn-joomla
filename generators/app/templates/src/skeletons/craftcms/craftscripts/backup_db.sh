#!/bin/bash

# Backup Database
#
# Backup the local database in to a compressed .sql.gz archive
#
# @author    nystudio107
# @copyright Copyright (c) 2017 nystudio107
# @link      https://nystudio107.com/
# @package   craft-scripts
# @since     1.1.0
# @license   MIT

# Get the directory of the currently executing script
DIR="$(dirname "${BASH_SOURCE[0]}")"

# Include files
INCLUDE_FILES=(
            "common/defaults.sh"
            ".env.sh"
            "common/common_env.sh"
            "common/common_db.sh"
            )
for INCLUDE_FILE in "${INCLUDE_FILES[@]}"
do
    if [ -f "${DIR}/${INCLUDE_FILE}" ]
    then
        source "${DIR}/${INCLUDE_FILE}"
    else
        echo "File ${DIR}/${INCLUDE_FILE} is missing, aborting."
        exit 1
    fi
done

# Set the backup db file name, parent directory path, and full path
BACKUP_DB_NAME="${LOCAL_DB_NAME}-db-backup-$(date '+%Y%m%d-%H%M%S').sql"
BACKUP_DB_DIR_PATH="${LOCAL_BACKUPS_PATH}${LOCAL_DB_NAME}/${DB_BACKUP_SUBDIR}/"
BACKUP_DB_PATH="${BACKUP_DB_DIR_PATH}${BACKUP_DB_NAME}"

# Make sure the directory exists
if [[ ! -d "${BACKUP_DB_DIR_PATH}" ]] ; then
    echo "Creating backup directory ${BACKUP_DB_DIR_PATH}"
    mkdir -p "${BACKUP_DB_DIR_PATH}"
fi

# Backup the local db
$LOCAL_MYSQLDUMP_CMD $LOCAL_DB_CREDS $MYSQLDUMP_SCHEMA_ARGS > "$BACKUP_DB_PATH"
$LOCAL_MYSQLDUMP_CMD $LOCAL_DB_CREDS $MYSQLDUMP_DATA_ARGS >> "$BACKUP_DB_PATH"
gzip -f "$BACKUP_DB_PATH"
echo "*** Backed up local database to ${BACKUP_DB_PATH}.gz"

# Remove backups older than LOCAL_BACKUPS_MAX_AGE
TMP_LOG_PATH="/tmp/${REMOTE_DB_NAME}-db-backups.log"
find "${BACKUP_DB_DIR_PATH}" -name "*.sql.gz" -mtime +${GLOBAL_DB_BACKUPS_MAX_AGE} -exec rm -fv "{}" \; &> $TMP_LOG_PATH

# Report on what we did
FILE_COUNT=`cat $TMP_LOG_PATH | wc -l`
if [ $FILE_COUNT == 1 ] ; then
    PLURAL_CHAR=""
fi
DETAILS_MSG="; details logged to ${TMP_LOG_PATH}"
if [ $FILE_COUNT == 0 ] ; then
    DETAILS_MSG=""
fi
echo "*** ${FILE_COUNT} old database backup${PLURAL_CHAR} removed${DETAILS_MSG}"

# Normal exit
exit 0
