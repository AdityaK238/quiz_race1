import admin from './firebaseadmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); 
  }

  const { uid } = req.body; 

  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.status(200).send({ message: 'User is now an admin' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
