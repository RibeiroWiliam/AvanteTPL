import { useState } from 'react';
import axios from 'axios';

export default function usePublisher(id){
  const [publisher, setPublisher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublisher = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/publishers/${id}`);
      setPublisher(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { publisher, loading, error, fetchPublisher };
};