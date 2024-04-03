import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAvailabilities() {
  const [availabilities, setAvailabilities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAvailabilities(){
      try {
        setLoading(true);
        const response = await axios.get(`/api/availabilities/`);
        setAvailabilities(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, []);

  return { availabilities, loading, error };
}