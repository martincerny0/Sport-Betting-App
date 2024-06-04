import { useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import Nav from '~/common/modules/components/Nav/Nav';
import Layout from '~/common/modules/components/Layout/layout';
import SmallLoading from '~/common/modules/components/SmallLoading/SmallLoading';
import { toast } from 'sonner';

const AccountBalanceRefill: React.FC = () => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    
    const [amount, setAmount] = useState<number>(0);
    const [isRefilling, setIsRefilling] = useState<boolean>(false);

    const refillMutation = api.account.refill.useMutation();

    const handleRefill = async () => {
        if (amount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        setIsRefilling(true);
        try {
            await refillMutation.mutateAsync({ userId, amount });
            toast.success('Balance refilled successfully!');
        } catch (error) {
            toast.error('Error refilling balance');
        } finally {
            setIsRefilling(false);
        }
    };

    return (
        <>
            <Head>
                <title>Refill Balance | Betton</title>
            </Head>
            <div className="flex gap-4 justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414] min-h-screen">
                <Nav isHomePage={false} />
                <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl p-8 shadow-lg">
                    <h2 className="text-white text-2xl font-bold mb-4">Refill Account Balance</h2>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        placeholder="Enter amount"
                        className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-10 w-64 px-4 focus:outline-none ease-in-out duration-300 text-lg font-light hover:ring-[#666666] hover:ring-2 mb-4"
                    />
                    <button 
                        onClick={handleRefill}
                        className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-2 px-6 font-bold text-lg rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex items-center justify-center"
                        disabled={isRefilling}
                    >
                        Refill Balance
                        {isRefilling && <SmallLoading isPending={isRefilling} />}
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccountBalanceRefill;
