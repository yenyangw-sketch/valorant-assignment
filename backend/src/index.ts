import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './firebase';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// ==================== USERS ENDPOINTS ====================

// Create new user
app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { email, username, displayName, photoURL } = req.body;

    // Validation
    if (!email || !username) {
      return res.status(400).json({ error: 'Email and username are required' });
    }

    // Check if user already exists
    const existingUser = await db.collection('users').where('email', '==', email).get();
    if (!existingUser.empty) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const checkUsername = await db.collection('users').where('username', '==', username).get();
    if (!checkUsername.empty) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Create new user
    const docRef = await db.collection('users').add({
      email,
      username,
      displayName: displayName || '',
      photoURL: photoURL || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json({
      id: docRef.id,
      email,
      username,
      displayName: displayName || '',
      photoURL: photoURL || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('users').get();

    if (snapshot.empty) {
      return res.json({ users: [] });
    }

    const users: any[] = [];
    snapshot.forEach((doc: any) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all users (POST - with optional filtering)
app.post('/api/users/list', async (req: Request, res: Response) => {
  try {
    const { search } = req.body;

    let query: any = db.collection('users');

    // If search term provided, filter by username or email
    if (search && typeof search === 'string') {
      query = query.where('username', '>=', search).where('username', '<=', search + '\uf8ff');
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return res.json({ users: [], total: 0 });
    }

    const users: any[] = [];
    snapshot.forEach((doc: any) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json({ users, total: users.length });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('users').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user
app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { displayName, photoURL } = req.body;

    const updateData: any = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (photoURL !== undefined) updateData.photoURL = photoURL;
    updateData.updatedAt = new Date().toISOString();

    await db.collection('users').doc(id).update(updateData);

    const doc = await db.collection('users').doc(id).get();
    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.collection('users').doc(id).delete();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ==================== AGENTS ENDPOINTS ====================

// Get all agents
app.get('/api/agents', async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('agents').get();

    if (snapshot.empty) {
      return res.json({ agents: [] });
    }

    const agents: any[] = [];
    snapshot.forEach((doc: any) => {
      agents.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json({ agents });
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// Get single agent by ID
app.get('/api/agents/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('agents').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error fetching agent:', error);
    res.status(500).json({ error: 'Failed to fetch agent' });
  }
});

// Create new agent
app.post('/api/agents', async (req: Request, res: Response) => {
  try {
    const { name, role, description } = req.body;

    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required' });
    }

    const docRef = await db.collection('agents').add({
      name,
      role,
      description: description || '',
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      id: docRef.id,
      name,
      role,
      description: description || '',
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating agent:', error);
    res.status(500).json({ error: 'Failed to create agent' });
  }
});

// Update agent
app.put('/api/agents/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, role, description } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (description !== undefined) updateData.description = description;

    await db.collection('agents').doc(id).update({
      ...updateData,
      updatedAt: new Date().toISOString(),
    });

    const doc = await db.collection('agents').doc(id).get();
    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (error) {
    console.error('Error updating agent:', error);
    res.status(500).json({ error: 'Failed to update agent' });
  }
});

// Delete agent
app.delete('/api/agents/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.collection('agents').doc(id).delete();
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Error deleting agent:', error);
    res.status(500).json({ error: 'Failed to delete agent' });
  }
});

// Export for Vercel serverless environment
export default app;

// Start server locally (for development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
