import { useState, useEffect } from 'react';

// Custom hook for API calls with loading and error states
export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await apiCall();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'An error occurred');
          console.error('API call failed:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('API refetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Hook for mutations (POST, PUT, DELETE)
export function useMutation<T, P = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (apiCall: (params: P) => Promise<T>, params: P): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall(params);
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Mutation failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}