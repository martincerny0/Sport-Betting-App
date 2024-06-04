
const InviteBanner : React.FC = () => {
    return (
        <div className="flex h-full items-center justify-center flex-col px-3 bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl">
        <img src="iphon.svg" alt="iphone" className="p-2"></img>
        <button className=" bg-gradient-to-b from-[#FFC701] to-[#FF9900] p-1 px-4 font-bold text-sm rounded-lg hover:rounded-xl ease-in-out duration-300 hover:text-black flex">SEND INVITE</button>
        </div>
    )
}

export default InviteBanner;