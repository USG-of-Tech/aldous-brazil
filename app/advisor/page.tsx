'use client';

import { useEffect, useState } from "react";
import { logoutUser } from "../utils/supabaseHelpers";
import AssignmentView from "./views/AssignmentView";
import { autoRedirect } from "../utils/generalHelper";
import { useRouter } from 'next/navigation';
import RegistrationView from "./views/RegistrationView";
import GuideView from "./views/GuideView";

function AdvisorView() {
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const router = useRouter();

    // TODO: Clean this up too slow rn
    useEffect(() => {(async () => {
        await autoRedirect(router);
    })()}, [router])

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
            <div className="h-[68px] w-full" /> {/* Hardcoded placeholder. TODO: Make it dynamic */}
            <div className="fixed navbar z-20 bg-base-100 shadow-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-xl dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li onClick={() => setPageNum(0)}><a>Registration</a></li>
                            <li onClick={() => setPageNum(2)}><a>Assignments</a></li>
                            <li onClick={() => setPageNum(3)}><a>Website Guide</a></li>
                        </ul>
                    </div>
                    <h1 className="text-3xl p-2">Berkeley Model United Nations</h1>
                    {/*<Image
                        src="/BMUN Circle Logo Cream.png"
                        alt="BMUN Logo"
                        height={48}
                        width={500}
                        style={{ height: '48px', width: 'auto' }}
                        className="block lg:hidden"
                        priority
                    />
                    <h1 className="text-3xl p-2 hidden lg:block">Berkeley Model United Nations</h1>*/}
                </div>
                <div className="navbar-center hidden lg:block">
                    <ul className="menu menu-horizontal px-1 text-lg">
                        <li onClick={() => {setPageNum(0)}}><a>Registration</a></li>
                        <li onClick={() => {setPageNum(2)}}><a>Assignments</a></li>
                        <li onClick={() => {setPageNum(3)}}><a>Website Guide</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost text-lg" disabled={loading} onClick={async () => await handleLogout()}>
                        {loading ? <span className="loading loading-spinner"></span> : <></>}
                        Logout
                    </button>
                </div>
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