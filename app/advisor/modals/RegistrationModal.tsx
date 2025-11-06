'use client';

import { createRegistration, currentConference } from "@/app/utils/supabaseHelpers";
import React, { useState } from "react";

interface RegistrationModalProps {
    creatingRegistration: boolean,
    setCreatingRegistration: Function,
    waitlistOpen: boolean
}

function RegistrationForm ({creatingRegistration, setCreatingRegistration, waitlistOpen} : RegistrationModalProps) {
    const [loading, setLoading] = useState(false)

    const [numBeginner, setNumBeginner] = useState(0);
    const [numIntermediate, setNumIntermediate] = useState(0);
    const [numAdvanced, setNumAdvanced] = useState(0);
    // Currently we have no foreign language committees. Update this as needed.
    // const [numSpanish, setNumSpanish] = useState(0);
    // const [numChinese, setNumChinese] = useState(0);
    const [onlinePayment, setOnlinePayment] = useState(false);

    async function handleSubmission () {
        setLoading(true);
        try {
            const success = await createRegistration({
                num_beginner_delegates: numBeginner,
                num_intermediate_delegates: numIntermediate,
                num_advanced_delegates: numAdvanced,
                num_spanish_speaking_delegates: 0,
                num_chinese_speaking_delegates: 0,
                delegate_fees_paid: 0,
                registration_fee_paid: false,
                is_waitlisted: waitlistOpen
            });
            if (success) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    if (creatingRegistration) {
        return (
            <div className="fixed z-50 inset-0 w-full h-full flex flex-row items-center justify-center">
                <div className="absolute z-10 w-full h-full bg-black opacity-60" onClick={() => setCreatingRegistration(false)}></div>
                <fieldset className="fieldset z-20 bg-black border-primary rounded-box w-md border-2 p-4 opacity-100">
                    <h3 className="text-5xl">
                        {waitlistOpen ? `Join the BMUN ${currentConference.session} waitlist`: `Register for BMUN ${currentConference.session}`} 
                    </h3>
                    <label className="label text-xl">Number of Beginner Delegates</label>
                    <input
                    type="text"
                    className="input input-lg w-full"
                    value={numBeginner.toString()}
                    onChange={(e) => {
                        // Remove all non-digit characters
                        const cleaned = e.target.value.replace(/\D/g, "");
                        // Parse to number or fallback 0
                        const num = cleaned === "" ? 0 : Number(cleaned);
                        setNumBeginner(num);
                    }}
                    />

                    <label className="label text-xl">Number of Intermediate Delegates</label>
                    <input
                    type="text"
                    className="input input-lg w-full"
                    value={numIntermediate.toString()}
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "");
                        const num = cleaned === "" ? 0 : Number(cleaned);
                        setNumIntermediate(num);
                    }}
                    />

                    <label className="label text-xl">Number of Advanced Delegates</label>
                    <input
                    type="text"
                    className="input input-lg w-full"
                    value={numAdvanced.toString()}
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "");
                        const num = cleaned === "" ? 0 : Number(cleaned);
                        setNumAdvanced(num);
                    }}
                    />

                    {/*
                    Once again, we have no foreign language committees as of 74.
                    <label className="label text-xl">Number of Spanish Speaking Delegates</label>
                    <input
                    type="text"
                    className="input input-lg w-full"
                    value={numSpanish.toString()}
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "");
                        const num = cleaned === "" ? 0 : Number(cleaned);
                        setNumSpanish(num);
                    }}
                    />

                    <label className="label text-xl">Number of Chinese Speaking Delegates</label>
                    <input
                    type="text"
                    className="input input-lg w-full"
                    value={numChinese.toString()}
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "");
                        const num = cleaned === "" ? 0 : Number(cleaned);
                        setNumChinese(num);
                    }}
                    />
                    */}
                    <label className="label text-xl mt-2">
                        <input type="checkbox" checked={onlinePayment} className="toggle toggle-primary" onChange={(_) => setOnlinePayment(!onlinePayment)} />
                        Pay Online
                    </label>
                    <button 
                        className="btn btn-primary mt-4 text-xl" 
                        onClick={async () => await handleSubmission()}
                        disabled={numBeginner == 0 && numIntermediate == 0 && numAdvanced == 0
                            || numBeginner + numIntermediate + numAdvanced > 50
                        }
                    >
                        {loading ? <span className="loading loading-spinner"></span> : <></>}
                        {waitlistOpen ? 'Join Waitlist': 'Register for BMUN'}
                    </button>
                    {numBeginner + numIntermediate + numAdvanced > 50 ? 
                        <div className="text-md text-red-500">Each school is limited to 50 delegates</div>
                        : <></>
                    }
                </fieldset>
            </div>
        );
    }
};

export default RegistrationForm;
