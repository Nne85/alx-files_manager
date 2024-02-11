import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }

    const hashPwd = sha1(password);

    try {
      const collection = dbClient.db.collection('users');
      const userExists = await collection.findOne({ email });

      if (userExists) {
        return response.status(400).json({ error: 'Already exist' });
      }

      const { insertedId } = await collection.insertOne({ email, password: hashPwd });
      const newUser = await collection.findOne({ _id: insertedId }, { projection: { email: 1 } });

      response.status(201).json({ id: insertedId, email: newUser.email });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Server error' });
    }
  }
}

export default UsersController;
