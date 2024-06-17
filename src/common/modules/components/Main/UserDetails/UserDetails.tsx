import { api } from '~/utils/api';
import Link from 'next/link';
import LoadingContainer from "~/common/modules/components/LoadingContainer/LoadingContainer";


interface IUserDetails {
    userId: string;
}

const UserDetails : React.FC<IUserDetails> = ({userId}) => {
    const { data, isLoading, isError } = api.user.getBalance.useQuery({userId: userId});

    const formatBalance = (balance : number) => {
      if (balance >= 1_000_000) {
        return (balance / 1_000_000).toFixed(1) + 'M';
      } else if (balance >= 1_000) {
        return (balance / 1_000).toFixed(1) + 'K';
      } else {
        return balance.toString();
      }
    };

    if(isLoading) return <div className="flex h-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><div className="-ml-28"><LoadingContainer isPending={true}></LoadingContainer></div></div>;
    if(!data || isError) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-sm"><p className="p3">There was an Error loading Data. Try Again Later</p></div>;


    return (
        <div className="h-full items-center font-bold flex justify-center flex-col  bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
          <p>YOUR BALANCE</p>
          <div className="flex flex-row gap-1">
            <div className="text-[#FAECDE] font-bold bg-gradient-to-b from-[#FFD355] via-[#D33469] to-[#40348A] rounded-xl items-center justify-center flex flex-col">
              <p className="p-1 px-2">{formatBalance(data?.balance?? 0)} $</p>
            </div>
            <Link href={"/deposit"} className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-2 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">REFILL</Link>
          </div>
        </div>
    );
};

export default UserDetails;
