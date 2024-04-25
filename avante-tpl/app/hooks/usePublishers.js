import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePublishers() {
  const [publishers, setPublishers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPublishers(){
      try {
        setLoading(true);
        const response = await axios.get(`/api/publishers/`);
        setPublishers(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  return { publishers, loading, error };
}
