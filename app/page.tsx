'use client';

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { autoRedirect } from "./utils/generalHelper";

/*
  Main page for login, registration, and FAQs.
*/

export default function Home() {
  const router = useRouter();

  // TODO: Clean this up, too slow
  useEffect(() => {(async () => {
    await autoRedirect(router);
  })()}, [router])

  return (
    <div className="bg-linear-65 from-black to-[#165a7b] bg-base-200 h-screen w-screen" />
  );
}
