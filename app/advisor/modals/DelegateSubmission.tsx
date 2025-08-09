'use client';

import { DelegateProps, getUsersFromAssignment, signUpDelegate } from "@/app/utils/supabaseHelpers";
import { useEffect, useState } from "react";

interface DelegateSubmissionProps {
    countryName: string,
    committeeName: string,
    specialized: boolean,
    assignmentId: number,
    assignmentDelegates: DelegateProps[],
    submittingDelegates: boolean,
    setSubmittingDelegates: Function
}

function DelegateSubmission({countryName, 
        committeeName,
        specialized,
        assignmentId,
        assignmentDelegates,
        submittingDelegates, 
        setSubmittingDelegates} : DelegateSubmissionProps
) {
    // Primary info
    const [primaryFirstName, setPrimaryFirstName] = useState("");
    const [primaryLastName, setPrimaryLastName] = useState("");
    const [primaryEmail, setPrimaryEmail] = useState("");
    const [primaryEmailValid, setPrimaryEmailValid] = useState(false);
    const [primaryLoading, setPrimaryLoading] = useState(false);
    const [primaryFilled, setPrimaryFilled] = useState(false);
    // Secondary info
    const [secondaryFirstName, setSecondaryFirstName] = useState("");
    const [secondaryLastName, setSecondaryLastName] = useState("");
    const [secondaryEmail, setSecondaryEmail] = useState("");
    const [secondaryEmailValid, setSecondaryEmailValid] = useState(false);
    const [secondaryLoading, setSecondaryLoading] = useState(false);
    const [secondaryFilled, setSecondaryFilled] = useState(false);

    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Check if the primary email is valid
        if (primaryEmail.length > 0) {
            setPrimaryEmailValid(emailRegex.test(primaryEmail));
        } else {
            setPrimaryEmailValid(false);
        }
        // Check if the secondary email is valid
        if (secondaryEmail.length > 0) {
            setSecondaryEmailValid(emailRegex.test(secondaryEmail));
        } else {
            setSecondaryEmailValid(false);
        }
    }, [primaryEmail, secondaryEmail]);

    useEffect(() => {(async () => {
        try {
            // Flush out old info
            console.log(assignmentDelegates);
            if (assignmentDelegates.length == 0) {
                setPrimaryFirstName("");
                setPrimaryLastName("");
                setPrimaryEmail("");
                setPrimaryFilled(false);
                setSecondaryFirstName("");
                setSecondaryLastName("");
                setSecondaryEmail("");
                setSecondaryFilled(false);
                return;
            }
            setPrimaryFirstName(assignmentDelegates[0].first_name);
            setPrimaryLastName(assignmentDelegates[0].last_name);
            setPrimaryEmail(assignmentDelegates[0].email);
            setPrimaryFilled(true);
            if (assignmentDelegates.length > 1) {
                setSecondaryFirstName(assignmentDelegates[1].first_name);
                setSecondaryLastName(assignmentDelegates[1].last_name);
                setSecondaryEmail(assignmentDelegates[1].email);
                setSecondaryFilled(true);
            }
        } catch (e) {
            console.error(e);
        }
    })()}, [assignmentId, submittingDelegates])

    const handlePrimarySubmission = async () => {
        setPrimaryLoading(true);
        try {
            await signUpDelegate(
                primaryFirstName,
                primaryLastName,
                primaryEmail,
                assignmentId
            );
            setPrimaryFilled(true);
        } catch (e) {
            console.error(e);
            window.alert("Failed to submit delegate. Please try again later.");
        }
        setPrimaryLoading(false);
    }

    const handleSecondarySubmission = async () => {
        setSecondaryLoading(true);
        try {
            await signUpDelegate(
                secondaryFirstName,
                secondaryLastName,
                secondaryEmail,
                assignmentId
            );
            setSecondaryFilled(true);
        } catch (e) {
            console.error(e);
            window.alert("Failed to submit delegate. Please try again later.");
        }
        setSecondaryLoading(false);
    }

    if (!submittingDelegates) {
        return (
            <div></div>
        )
    }

    return (
        <div className="fixed z-50 inset-0 w-full h-full flex flex-row items-center justify-center">
            <div className="absolute z-10 w-full h-full bg-black opacity-50" onClick={() => setSubmittingDelegates(false)}></div>
            <fieldset className="fieldset z-20 bg-base-200 border-base-300 w-5/12 max-h-8/12 overflow-scroll rounded-box border p-4 opacity-100">
                <h5 className="text-6xl">
                    Assignment: <span className="text-primary">{committeeName}</span> {countryName}
                </h5>
                <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row">
                    <div>
                        <h3 className="text-4xl">First Delegate</h3>
                        <label className="label text-xl">First Name</label>
                        <input 
                            type="text" 
                            className="input input-lg w-full"
                            value={primaryFirstName}
                            disabled={primaryFilled || primaryLoading}
                            onChange={(event) => setPrimaryFirstName(event.target.value)}/>
                        <label className="label text-xl">Last Name</label>
                        <input 
                            type="text" 
                            className="input input-lg w-full"
                            value={primaryLastName}
                            disabled={primaryFilled || primaryLoading}
                            onChange={(event) => setPrimaryLastName(event.target.value)}/>
                        <label className="label text-xl">Email</label>
                        <input 
                            type="text" 
                            className="input input-lg w-full"
                            value={primaryEmail}
                            disabled={primaryFilled || primaryLoading}
                            onChange={(event) => setPrimaryEmail(event.target.value)}/>
                        <button 
                            className="btn btn-primary btn-lg w-full mt-2"
                            disabled={primaryFilled || primaryLoading ||
                                primaryFirstName.length == 0 ||
                                primaryLastName.length == 0 ||
                                !primaryEmailValid}
                            onClick={async () => await handlePrimarySubmission()}
                        >
                            {primaryLoading ? <span className="loading loading-spinner"></span> : <></>}
                            Submit Delegate
                        </button>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div>
                        <h3 className="text-4xl">Second Delegate</h3>
                        <label className="label text-xl">First Name</label>
                        <input 
                            type="text" 
                            className="input input-lg w-full"
                            value={secondaryFirstName}
                            onChange={(event) => setSecondaryFirstName(event.target.value)}
                            disabled={specialized || secondaryFilled || secondaryLoading}/>
                        <label className="label text-xl">Last Name</label>
                        <input 
                            type="text" 
                            className="input input-lg w-full"
                            value={secondaryLastName}
                            onChange={(event) => setSecondaryLastName(event.target.value)}
                            disabled={specialized || secondaryFilled || secondaryLoading}/>
                        <label className="label text-xl">Email</label>
                        <input 
                            type="text" 
                            className="input input-lg w-full"
                            value={secondaryEmail}
                            onChange={(event) => setSecondaryEmail(event.target.value)}
                            disabled={specialized || secondaryFilled || secondaryLoading}/>
                        <button 
                            className="btn btn-primary btn-lg w-full mt-2"
                            disabled={secondaryFilled || secondaryLoading ||
                                specialized ||
                                secondaryFirstName.length == 0 ||
                                secondaryLastName.length == 0 ||
                                !secondaryEmailValid}
                            onClick={async () => await handleSecondarySubmission()}
                        >
                            {secondaryLoading ? <span className="loading loading-spinner"></span> : <></>}
                            Submit Delegate
                        </button>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

export default DelegateSubmission;