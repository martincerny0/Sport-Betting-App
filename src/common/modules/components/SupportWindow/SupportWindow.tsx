import { api } from '~/utils/api';
import Link from 'next/link';
import LoadingContainer from "~/common/modules/components/LoadingContainer/LoadingContainer";


interface ISupportWindow {
    userId: string;
}

const SupportWindow : React.FC<ISupportWindow> = ({userId}) => {
    const { data, isLoading, isError } = api.user.getBalance.useQuery({userId: userId});

    if(isLoading) return <div className="flex h-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><div className="-ml-28"><LoadingContainer isPending={true}></LoadingContainer></div></div>;
    if(isError) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-sm"><p className='p-3'>There was an Error loading Data. Try Again Later</p></div>;
    if(!data) return <div className="flex h-full w-full items-center justify-center flex-row bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl"><p>There is no tickets</p></div>;


    return (
        <div className="h-full items-center font-bold flex justify-center flex-col  bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
          <p>SUPPORT</p>
            <Link href={"/issue/new"} className=" mt-5 bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-2 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">OPEN ISSUE</Link>            
            <span className='mt-2'>or</span>
            <p className='text-sm mt-2'>support@betton.com</p>
        </div>
    );
};

export default SupportWindow;
