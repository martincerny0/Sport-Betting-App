interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}


const Modal: React.FC<IModalProps> = ({isOpen}) => {
    if(!isOpen) return null;

  return (
    <div className="absolute flex gap-4 justify-center items-center flex-col bg-gradient-to-b from-[#0D263D] to-[#141414]">
        <input type="text" name="" id="" />
    </div>
  );
}

export default Modal;