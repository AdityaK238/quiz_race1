import prisma from "../../lib/postgres/prisma";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { u_id, email } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        u_id,
        email,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
