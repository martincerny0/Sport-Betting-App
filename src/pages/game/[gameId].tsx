import { useRouter } from 'next/router'
import { api } from '~/utils/api';
import { useEffect, useState } from 'react';

export default function Game() {
  const router = useRouter();
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.gameId) {
      setGameId(router.query.gameId as string);
    }
  }, [router.query.gameId]);

  const { data, isLoading, error } = api.game.getGameById.useQuery(
    { gameId: gameId ?? "" }, 
    { enabled: !!gameId }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading ticket: {error.message}</p>;
  }

  return (
    <div>
      <p>Ticket: {gameId}</p>
      {data && (
        <div>
          {/* Render your ticket details here using data */}
          <p>{JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
}
