import loadingAnimationSmall from '../../../../../public/Animation/loadingSmall.json';
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
        <div className='h-1 w-7'>
           <Lottie animationData={loadingAnimationSmall} loop></Lottie>
        </div>
    )
}

export default LoadingOverlay;