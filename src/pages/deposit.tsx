import { useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import Nav from '~/common/modules/components/Nav/Nav';
import SmallLoading from '~/common/modules/components/SmallLoading/SmallLoading';
import InviteBanner from '~/common/modules/components/Main/InviteBanner/InviteBanner';
import { toast } from 'sonner';

const AccountBalanceRefill: React.FC = () => {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    
    const [amount, setAmount] = useState<number>(0);
    const [depositCode, setDepositCode] = useState<string>('');
    const [isRefilling, setIsRefilling] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');

    const depositMutation = api.user.depositBalance.useMutation();

    const handleRefill = async () => {
        if (amount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        setIsRefilling(true);
        try {
            await depositMutation.mutateAsync({ depositCode, userId: userId ?? "", amount });
            toast.success('Balance refilled successfully!');
        } catch (error) {
            toast.error('Error refilling balance');
        } finally {
            setIsRefilling(false);
        }
    };

    const presetAmounts = [10, 20, 40, 50];

    return (
        <>
            <Head>
                <title>Refill Balance | Betton</title>
            </Head>
            <div className="flex gap-4 justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
                <Nav isHomePage={false} />
                <div className="row-span-2 justify-center items-center flex-col text-white p-[1px] bg-gradient-to-b from-[#EEBC8A] to-[#666666] rounded-xl mt-20">
                    <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#3A425A] to-[#0D263D]  rounded-xl p-8 shadow-lg w-95">
                    <h2 className="text-white text-2xl font-bold mb-4">Deposit Account Balance</h2>
                    <div className="w-full mb-4">
                        <label className="text-white font-bold mb-2 block">Select Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-10 w-full px-4 focus:outline-none ease-in-out duration-300 text-lg font-light hover:ring-[#666666] hover:ring-2 mb-4"
                        >
                            <option>Credit Card</option>
                            <option>PayPal</option>
                            <option>Bank Transfer</option>
                            <option>Skrill</option>
                            <option>Neteller</option>
                        </select>
                    </div>
                    <div className="w-full mb-4">
                        <label className="text-white font-bold mb-2 block">Preset Amounts</label>
                        <div className="grid grid-cols-2 gap-2">
                            {presetAmounts.map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => setAmount(preset)}
                                    className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-10 w-full px-4 focus:outline-none ease-in-out duration-300 text-lg font-light hover:ring-[#666666] hover:ring-2"
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full mb-4">
                        <label className="text-white font-bold mb-2 block">Custom Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            placeholder="Enter amount"
                            className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-10 w-full px-4 focus:outline-none ease-in-out duration-300 text-lg font-light hover:ring-[#666666] hover:ring-2"
                        />
                    </div>
                    <div className="w-full mb-4">
                        <label className="text-white font-bold mb-2 block">Deposit Code (optional)</label>
                        <input
                            type="text"
                            value={depositCode}
                            onChange={(e) => setDepositCode(e.target.value)}
                            placeholder="Enter deposit code"
                            className="text-[#FAECDE] bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-lg h-10 w-full px-4 focus:outline-none ease-in-out duration-300 text-lg font-light hover:ring-[#666666] hover:ring-2"
                        />
                    </div>
                    <button
                        onClick={handleRefill}
                        className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-2 px-6 font-bold text-lg rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex items-center justify-center"
                        disabled={isRefilling}
                    >
                        Deposit
                        {isRefilling && <SmallLoading isPending={isRefilling} />}
                    </button>
                </div>
                </div>
                {/* <InviteBanner /> */}
            </div>
        </>
    );
};

export default AccountBalanceRefill;
