import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useEquipments() {
  const [equipments, setEquipments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEquipments(){
      try {
        setLoading(true);
        const response = await axios.get(`/api/equipments/`);
        setEquipments(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  return { equipments, loading, error };
}
