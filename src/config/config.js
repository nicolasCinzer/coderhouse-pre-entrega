export const databaseURI = process.env.DB_URL
export const adminPw = process.env.ADMIN_PASSWORD
export const adminEmail = process.env.ADMIN_EMAIL
export const gitHubClientID = process.env.GITHUB_CLIENT_ID
export const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET
export const gitHubCallbackURL = process.env.GITHUB_CALLBACK_URL
export const googleClientID = process.env.GOOGLE_CLIENT_ID
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
export const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL
export const jwtSecretKey = process.env.JWT_SECRET_KEY
export const coockieSecretKey = process.env.COOKIE_SECRET_KEY
export const PORT = process.env.PORT
export const nodemailerEmail = process.env.NODEMAILER_EMAIL
export const nodemailerPw = process.env.NODEMAILER_PASSWORD
export const env = process.env.ENVIROMENT
export const server_url = process.env.SERVER_URL

export default {
  databaseURI,
  adminPw,
  adminEmail,
  gitHubClientID,
  gitHubClientSecret,
  gitHubCallbackURL,
  googleClientID,
  googleClientSecret,
  googleCallbackURL,
  jwtSecretKey,
  coockieSecretKey,
  PORT,
  nodemailerEmail,
  nodemailerPw,
  env,
  server_url
}
