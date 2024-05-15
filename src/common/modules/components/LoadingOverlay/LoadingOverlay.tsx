import loadingAnimation from '../../../../../public/Animation/loadingLarge.json';
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

interface ILopadingOverlayProps {
    isPending: boolean;
}    
const LoadingOverlay: React.FC<ILopadingOverlayProps> = ({isPending}) => {

  if(!isPending) return null;
    return (
        <>
        <div className={"absolute top-0 left-0 z-[1000] w-full h-full"}>
         <div className={"flex fixed flex-col items-center justify-center backdrop-blur-md transition-all w-full h-full"}>
           <Lottie animationData={loadingAnimation} loop className="h-full"></Lottie>
         </div>
        </div>
        </>
    )
}

export default LoadingOverlay;