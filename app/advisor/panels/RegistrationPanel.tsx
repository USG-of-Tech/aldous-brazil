'use client';

import { currentConference, getRegistration, RegistrationProps } from "@/app/utils/supabaseHelpers";
import { openingSpiel } from "../OpeningSpiel";
import { useEffect, useState } from "react";

interface RegistrationPanelProps {
    creatingRegistration: boolean,
    setCreatingRegistration: Function,
    setRegLoading: Function
}

function RegistrationPanel({creatingRegistration, setCreatingRegistration, setRegLoading}: RegistrationPanelProps) {
    const [registered, setRegistered] = useState(false);
    const [registration, setRegistration] = useState<RegistrationProps>();

    useEffect(() => {(async () => {
        const newReg = await getRegistration();
        const reg = newReg !== null;
        setRegistered(reg);
        if (reg) {
            setRegistration(newReg);
        }
        setRegLoading(false);
    })()}, []);

    return (
        <div className="flex flex-col w-full p-2">
            <div className="flex flex-row justify-start">
                <h2 className="text-7xl">Welcome to <span className="text-primary text-nowrap">BMUN {currentConference.session}</span>!</h2>
            </div>
            {registered && registration !== undefined ?
                <div className="flex flex-col w-full justify-start text-xl">
                    <p>Congratulations! You have successfully registered for <span className="text-primary font-bold">BMUN {currentConference.session}</span>!
                    Please view the listed information to see your confirmed registration numbers and payment status. Please direct 
                    any questions to <span className="text-primary font-bold">info@bmun.org</span> and <span className="text-primary font-bold">tech@bmun.org</span>.
                    </p>
                    <div className="stats py-2">
                        <div className="stat">
                            <div className="stat-title text-base">Total Registered</div>
                            <div className="stat-value text-primary">{registration.num_beginner_delegates + registration.num_intermediate_delegates + registration.num_advanced_delegates}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-base">Beginner</div>
                            <div className="stat-value text-secondary">{registration.num_beginner_delegates}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-base">Intermediate</div>
                            <div className="stat-value text-secondary">{registration.num_intermediate_delegates}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-base">Advanced</div>
                            <div className="stat-value text-secondary">{registration.num_advanced_delegates}</div>
                        </div>
                    </div>
                    <p>
                        Please take the time to review the <span className="text-primary">Website Guide</span> to familiarize yourself
                        with the new website layout. We have provided numerous video and text-based guides on all the key functionality that you and your 
                        delegates need to understand for the upcoming conference!
                    </p>
                    <div className="flex flex-row flex-wrap gap-4 mt-8 w-full justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <input readOnly type="checkbox" checked={registration.delegate_fees_paid} className="checkbox checkbox-primary" />
                            <label className="label text-lg">Delegate Fees Paid</label>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <input readOnly type="checkbox" checked={registration.registration_fee_paid} className="checkbox checkbox-primary" />
                            <label className="label text-lg">School Fee Paid</label>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <input readOnly type="checkbox" checked={registration.is_waitlisted} className="checkbox checkbox-primary" />
                            <label className="label text-lg">Waitlisted</label>
                        </div>
                    </div>
                    <div className="divider text-primary"></div>
                </div>
                :
                <div className="flex flex-col w-full h-full justify-start">
                    {openingSpiel}
                    <button className="btn btn-xl text-xl btn-primary mt-4"
                        disabled={!currentConference.open_reg}
                        onClick={() => setCreatingRegistration(true)}>
                            Register Now
                    </button>
                    <div className="flex flex-row justify-between p-4">
                        <div className="flex flex-row">
                            <p className="text-2xl text-center">Registration is&nbsp;</p>
                            <div className="badge badge-primary badge-xl">Open</div>
                        </div>
                        <div className="flex flex-row">
                            <p className="text-2xl text-center">Waitlist is&nbsp;</p>
                            <div className="badge badge-error badge-xl">Closed</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RegistrationPanel;