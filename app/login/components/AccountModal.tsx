import { useState } from "react";
import AccountInfo from "./AccountInfo";
import SchoolInfo from "./SchoolInfo";
import { currentConference } from "../../utils/supabaseHelpers";

interface AccountProps {
    registering: boolean,
    setRegistering: Function,
}

function AccountModal({registering, setRegistering}: AccountProps) {
    const [page, setPage] = useState(0)
    const [newId, setNewId] = useState('')

    const updatePage = () => setPage((page + 1) % 4)

    if (registering) {
        return (
            <div className="absolute z-10 w-screen h-screen flex flex-row items-center justify-center">
                <div 
                    className="absolute z-20 w-full h-full bg-black opacity-50" 
                    onClick={(_) => {
                        setRegistering(false);
                        if (page == 3) {
                            setPage(0);
                        } else if (page == 2) {
                        }
                }}></div>
                <fieldset className="fieldset z-30 bg-base-100 border-base-200 rounded-box w-md max-h-11/12 overflow-y-scroll border p-4">
                    {
                        page == 0 ? 
                        (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-5xl">Register for <span className="text-primary">BMUN {currentConference.session}</span>!</h1>
                            <p className="text-lg">
                                Welcome to Aldous! In order to register for BMUN {currentConference.session} you will have to create an advisor account &#40;even if you
                                have been to BMUN before&#41;. Once you are able to sign in, you can register on the main page for your account. 
                                If you have any questions about the registration process, our timeline, or our new website please go to the following FAQ.
                            </p>
                            <button className="btn btn-outline btn-primary mt-4" onClick={(_) => updatePage()}>
                                Next
                            </button>
                        </div> 
                        ) : page == 1 ?
                        (
                            <AccountInfo updatePage={updatePage} setNewId={setNewId} />
                        ) : page == 2 ?
                        (
                            <SchoolInfo updatePage={updatePage} newId={newId} />
                        ) :
                        (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-5xl">Congratulations!</h1>
                            <p className="text-lg">
                                You have created your advisor account and you are now able to register for BMUN {currentConference.session}! Proceed to the login form and access the main 
                                page of your account to register your delegates.
                            </p>
                            <button className="btn btn-outline btn-primary mt-4" onClick={(_) => {setRegistering(false); setPage(0)}}>
                                Exit
                            </button>
                        </div> )
                    }
                </fieldset>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default AccountModal;