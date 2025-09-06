'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { resetPassword } from "../utils/supabaseHelpers";
import { autoRedirect, noLoginRedirect } from "../utils/generalHelper";

function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    const [newError, setNewError] = useState(false);
    const [checkError, setCheckError] = useState(false);

    const router = useRouter();
   
    useEffect(() => {(async () => {
        await noLoginRedirect(router);
    })()}, [router]);

    useEffect(() => {
        setNewError(newPassword.length > 0 && newPassword.length < 8);
        setCheckError(newPassword != checkPassword && checkPassword.length != 0);
    }, [newPassword, checkPassword]);
    
    const handleSubmission = async () => {
        setLoading(true);
        try {
            const result = await resetPassword(newPassword);
            if (!result) {
                window.alert("Something went wrong, try again later");
            } else {
                autoRedirect(router);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center">
            <div>
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
                    <h1 className="text-5xl">Reset Password</h1>
                    <label className="label">Password (Must be 8+ Characters)</label>
                    <div>
                        <input 
                            type="password" 
                            className={`input input-lg ${newError ? 'input-error' : ''}`} 
                            placeholder="Password" 
                            value={newPassword} 
                            onChange={(event) => setNewPassword(event.target.value)} />
                    </div>
                    <label className="label">Password (Confirm)</label>
                    <div>
                        <input 
                            type="password" 
                            className={`input input-lg ${checkError ? 'input-error' : ''}`} 
                            placeholder="Password" 
                            value={checkPassword} 
                            onChange={(event) => setCheckPassword(event.target.value)} />
                    </div>
                    <button 
                        className="btn btn-lg mt-2 btn-secondary w-full"
                        disabled={newPassword != checkPassword || newPassword.length == 0 || loading}
                        onClick={handleSubmission}>
                            {loading ? <span className="loading loading-spinner"></span> : <></>}
                            Reset Password
                    </button>
                </fieldset>
            </div>
        </div>
    )
}

export default ResetPassword;