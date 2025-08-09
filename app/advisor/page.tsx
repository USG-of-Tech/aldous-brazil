'use client';

import { useEffect, useState } from "react";
import { logoutUser } from "../utils/supabaseHelpers";
import AssignmentView from "./views/AssignmentView";
import { autoRedirect } from "../utils/generalHelper";
import { useRouter } from 'next/navigation';
import RegistrationView from "./views/RegistrationView";
import Image from 'next/image';
import GuideView from "./views/GuideView";

function AdvisorView() {
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const router = useRouter();

    // TODO: Clean this up too slow rn
    useEffect(() => {(async () => {
        await autoRedirect(router);
    })()}, [])

    async function handleLogout() {
        setLoading(true);
        try {
            await logoutUser();
            await autoRedirect(router);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col gap-5 bg-base-300">
            <div className="navbar bg-primary text-white flex flex-row justify-between shadow-md">
                <div className="flex flex-row items-center">
                    <Image
                        src="/BMUN Circle Logo Cream.png"
                        alt="BMUN Logo"
                        height={48}
                        width={500}
                        style={{ height: '48px', width: 'auto' }}
                        className="block lg:hidden"
                        priority
                    />
                    <h1 className="text-3xl p-2 hidden lg:block">Berkeley Model United Nations</h1>
                </div>
                <ul className="flex flex-row text-lg gap-4 font-bold">
                    <li>
                        <button 
                            className={`btn btn-primary btn-lg border-none text-white ${pageNum==0 ? "bg-secondary inset-shadow-sm pointer-events-none" : "shadow-none"}`}
                            onClick={() => {setPageNum(0)}}>
                            Registration
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`btn btn-primary btn-lg border-none text-white ${pageNum==2 ? "bg-secondary inset-shadow-sm pointer-events-none" : "shadow-none"}`}
                            onClick={() => {setPageNum(2)}}>
                            Assignments
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`btn btn-primary btn-lg border-none text-white ${pageNum==3 ? "bg-secondary inset-shadow-sm pointer-events-none" : "shadow-none"}`}
                            onClick={() => {setPageNum(3)}}>
                            Website Guide
                        </button>
                    </li>
                </ul>
                <button className="btn btn-ghost text-lg" disabled={loading} onClick={async () => await handleLogout()}>
                    {loading ? <span className="loading loading-spinner"></span> : <></>}
                    Logout
                </button>
            </div>
            <div className="w-full h-full flex flex-row justify-center items-center mb-2">
                <div className="max-w-screen lg:w-10/12 lg:h-10/12 bg-base-300 rounded-md p-4 lg:overflow-scroll">
                    <div className={pageNum != 0 ? 'hidden' : ''}>
                        <RegistrationView />
                    </div>
                    <div className={pageNum != 2 ? 'hidden' : ''}>
                        <AssignmentView />
                    </div>
                    <div className={pageNum != 3 ? 'hidden' : ''}>
                        <GuideView />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvisorView;