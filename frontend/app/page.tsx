'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Agent {
  id: number;
  name: string;
  role: string;
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/agents`
        );
        setAgents(response.data.agents);
      } catch (err) {
        setError('Failed to fetch agents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <main className="container">
      <h1>Valorant Agents</h1>
      {loading && <p>Loading agents...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && agents.length > 0 && (
        <div className="agents-grid">
          {agents.map((agent) => (
            <div key={agent.id} className="agent-card">
              <h2>{agent.name}</h2>
              <p className="role">{agent.role}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
