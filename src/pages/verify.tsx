// pages/confirm-email/[hash].tsx

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Base64 } from 'js-base64'; // for base64 decoding

interface ConfirmEmailPageProps {
  hash: string;
}

const ConfirmEmailPage: NextPage<ConfirmEmailPageProps> = ({ hash }) => {
  const router = useRouter();
  const { data: user } = useQuery(['user.get', hash], {
    fetchOptions: {
      body: JSON.stringify({ emailHash: hash }), // Pass the hash as request payload
    },
  });

  // Use trpc mutation to update user verification status
  const [confirmEmail] = useMutation('user.confirmEmail', {
    onSuccess: () => {
      // Redirect user to a success page or any other page after successful confirmation
      router.push('/email-confirmed');
    },
  });

  // Check if the user exists and if the email is already verified
  if (user && user.emailVerified) {
    // If email is already verified, redirect user to another page
    router.push('/email-already-verified');
    return null; // Render nothing on this page
  }

  // If user doesn't exist or email is not verified yet, render a confirmation message or a form
  return (
    <div>
      <h1>Email Confirmation</h1>
      {user ? (
        <div>
          <p>Hello, {user.name}!</p>
          <button onClick={() => confirmEmail.mutate(hash)}>Confirm Email</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ConfirmEmailPageProps> = async ({ params }) => {
  const { hash } = params;

  return {
    props: {
      hash: Array.isArray(hash) ? hash[0] : hash, // Ensure hash is a string
    },
  };
};

export default ConfirmEmailPage;
