import Link from "next/link";

const Footer : React.FC = () => {
    return (
    <footer className="h-full items-center pl-8 pr-8  flex justify-between bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl ">
          <p className="text-sm">© 2024 <span className="font-bold">Betton.</span> All Rights Reserved.</p>
          <div className="flex">
          <Link href={"/policy"} className="text-sm ml-2 mr-2">Privacy Policy</Link>
          <p className="text-sm mr-2">|</p>
          <Link href={"/terms"} className="text-sm ml-2">Terms & Confitions</Link>
          </div>
    </footer>
    );
}

export default Footer;