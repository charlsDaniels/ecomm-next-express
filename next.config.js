const nextConfig = {
  env: {
    firebase_apiKey: process.env.FIREBASE_API_KEY,
    firebase_authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebase_projectId: process.env.FIREBASE_PROJECT_ID,
    firebase_storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebase_messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebase_appId: process.env.FIREBASE_APP_ID,
  }
}

module.exports = nextConfig
