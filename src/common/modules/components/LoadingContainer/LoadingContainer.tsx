import loadingAnimationSmall from '../../../../../public/Animation/loadingSmall.json';
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

interface ILopadingContainerProps {
    isPending: boolean;
}    
const LoadingContainer: React.FC<ILopadingContainerProps> = ({isPending}) => {
  if(!isPending) return null;
    return (
        <div className='h-full w-full'>
           <Lottie animationData={loadingAnimationSmall} loop></Lottie>
        </div>
    )
}

export default LoadingContainer;