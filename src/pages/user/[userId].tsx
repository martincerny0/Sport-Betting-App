import { useRouter } from 'next/router'
import { api } from '~/utils/api';
import { useEffect, useState } from 'react';

export default function User() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.userId) {
      setUserId(router.query.userId as string);
    }
  }, [router.query.userId]);

  const { data, isLoading, error } = api.user.getUserById.useQuery(
    { id: userId ?? "" }, 
    { enabled: !!userId }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading ticket: {error.message}</p>;
  }

  return (
    <div>
      <p>Ticket: {userId}</p>
      {data && (
        <div>
          {/* Render your ticket details here using data */}
          <p>{JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
}
