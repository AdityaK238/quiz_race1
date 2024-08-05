import admin from 'firebase-admin'
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(env("SERVICE_ACCOUNT_KEY")),
    });
}

export default admin;