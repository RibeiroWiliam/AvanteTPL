import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAssignments() {
  const [assignments, setAssignments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAssignments(){
      try {
        setLoading(true);
        const response = await axios.get(`/api/assignments/`);
        setAssignments(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return { assignments, setAssignments, loading, error };
}