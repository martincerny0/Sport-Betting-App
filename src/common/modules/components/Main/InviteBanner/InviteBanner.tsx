import { api } from '~/utils/api';
import { toast } from "sonner";
import { Toaster } from 'sonner';

interface InviteBannerProps {
    userId: string;
}

const InviteBanner : React.FC<InviteBannerProps> = ({userId}) => {

    const { data : InviteCode, isLoading, isError } = api.user.getInviteCode.useQuery({userId});
    if(!userId) return <div className="flex h-full items-center justify-center flex-col px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-[#EEBC8A]"><p className='text-center text-sm'>Log in to see full content</p></div>;
    if(!InviteCode) return <div className="flex h-full items-center justify-center flex-col px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl text-[#EEBC8A]"><p>There was an Error loading Data. Try Again Later</p></div>;

    const copyLink = async () => {
        await navigator.clipboard.writeText(`localhost:3000/signup?invite=${InviteCode.inviteCode}`);
        toast.success("Link Copied to Clipboard", {
            duration: 1500,
        }
        );
    }

    return (
        <>
        <Toaster position="top-left" />
        <div className="flex h-full items-center justify-center flex-col px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
        <img src="iphon.svg" alt="iphone" className="p-2"></img>
        <button className="bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex mt-3" onClick={copyLink}>COPY INVITE</button>
        </div>
        </>
    )
}

export default InviteBanner;