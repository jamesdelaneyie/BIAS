// googleSheetsService.js
const { google } = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES
  });
  const authToken = await auth.getClient();
  return authToken;
}

module.exports = {
  getAuthToken,
}