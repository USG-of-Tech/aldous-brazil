'use client';

import { useEffect, useState } from "react";
import { autoRedirect } from "../utils/generalHelper";

import { useRouter } from 'next/navigation';
import { logoutUser } from "../utils/supabaseHelpers";
import AdminPanel from "./panels/AdminPanel";
import TechPanel from "./panels/TechPanel";

function AdminView() {
    const [loading, setLoading] = useState(false);
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
        <div className="flex flex-row w-screen h-screen items-center justify-center bg-base-300">
            <div className="tabs tabs-lift tabs-xl w-10/12 h-9/12">
                <input type="radio" name="my_tabs_3" className="tab" aria-label="Admin" />
                <div className="tab-content bg-base-100 border-base-300 p-6 overflow-scroll">
                    <AdminPanel />
                </div>

                <input type="radio" name="my_tabs_3" className="tab" aria-label="Tech" defaultChecked />
                <div className="tab-content bg-base-100 border-base-300 p-6 overflow-scroll">
                    <TechPanel />
                </div>

                <input type="radio" name="my_tabs_3" className="tab" aria-label="Treasurer" />
                <div className="tab-content bg-base-100 border-base-300 p-6 overflow-scroll">
                    Not implemented (lol)
                </div>

                <input type="radio" name="my_tabs_3" className="tab" aria-label="External" />
                <div className="tab-content bg-base-100 border-base-300 p-6 overflow-scroll">
                    Not implemented (lol)
                </div>

                <button className="btn btn-primary" disabled={loading} onClick={async () => await handleLogout()}>
                    {loading ? <span className="loading loading-spinner"></span> : <></>}
                    Logout
                </button>
            </div>
        </div>
    )
}

export default AdminView;