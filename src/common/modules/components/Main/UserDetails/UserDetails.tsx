import { api } from '~/utils/api';

interface IUserDetails {
    userId: string;
}

const UserDetails : React.FC<IUserDetails> = ({userId}) => {
    const { data, isLoading, isError } = api.user.getBalance.useQuery({userId: userId});

    

    return (
        <div className="h-full items-center font-bold flex justify-center flex-col  bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
        <p>YOUR BALANCE</p>
        <div className="flex flex-row gap-1">
        <div className="text-[#FAECDE] font-bold bg-gradient-to-b from-[#FFD355] via-[#D33469] to-[#40348A] rounded-xl items-center justify-center flex flex-col">
          <p className="p-1 px-2">{data?.balance} $</p>
          </div>
          <button className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-2 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">REFILL</button>
          </div>
      </div>
    )

}

export default UserDetails;