# MHF Othem Närvarosystem

## Features
### Non admin
- Report närvaro with personnummer.
- See how many people are reported today.
  
### Admin
- See complete närvarolista for each day.
- See all members.
- Add members.
- Edit/remove members.
- Add new admin users.

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
`0 2 * * 1 autoBackup.sh`
