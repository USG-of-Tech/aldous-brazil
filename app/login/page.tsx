'use client';

import LoginModal from "./forms/LoginForm";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { autoRedirect } from "../utils/generalHelper";
import AccountRegistrationForm from "./modals/AccountRegistrationModal";

export default function Home() {
  const [registering, setRegistering] = useState(false);
  const router = useRouter();

  // TODO: Clean this up, too slow
  useEffect(() => {(async () => {
    await autoRedirect(router);
  })()}, [router])

  return (
    // <div className="bg-linear-65 from-[#63bce8] to-white">
    // <div className="bg-linear-65 from-black to-[#165a7b] bg-base-200">
    <div className="bg-linear-65 from-black to-[#165a7b] bg-base-200">
      <div className="absolute">
        <AccountRegistrationForm registering={registering} setRegistering={setRegistering}/>
      </div>
      <div className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-row items-center justify-center">
          <LoginModal setRegistering={setRegistering} />
        </div>
        <div className="items-center justify-center hidden lg:flex lg:flex-row">
          <Image src="/BMUN Circle Logo Blue.png" alt="BMUN Logo" width={500} height={500}/>
        </div>
      </div>
    </div>
  );
}
