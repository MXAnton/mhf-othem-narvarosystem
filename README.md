# MHF Othem Närvarosystem

## Frontend
- Vue 3 (frontend framework)
- Vue router (handles the routes)
- Axios (handles API requests to backend)
- Pinia (store that can be accessed globally)

## Backend
- Node.js (server)
- Express.js (handles incoming requests from frontend)
- Cors (used to allow only the frontend origin to access)
- bcryptjs (cryptates the passwords)
- jsonwebtoken (stores admin login token to stay logged in)
- MySQL (database)

## Automatic Backups
Open cron editor:
`crontab -e`

Run this to setup cronjob each monday 02.00:
`0 2 * * 1 /path/to/backup.sh`
