'use client';

import { RegistrationProps, createRegistration, currentConference } from "@/app/utils/supabaseHelpers";
import React, { useState } from "react";

interface RegistrationModalProps {
    creatingRegistration: boolean,
    setCreatingRegistration: Function,
}

function RegistrationForm ({creatingRegistration, setCreatingRegistration} : RegistrationModalProps) {
    const [loading, setLoading] = useState(false)

    const [numBeginner, setNumBeginner] = useState(0);
    const [numIntermediate, setNumIntermediate] = useState(0);
    const [numAdvanced, setNumAdvanced] = useState(0);
    const [numSpanish, setNumSpanish] = useState(0);
    const [numChinese, setNumChinese] = useState(0);
    const [onlinePayment, setOnlinePayment] = useState(false);

    async function handleSubmission () {
        setLoading(true);
        try {
            const success = await createRegistration({
                num_beginner_delegates: numBeginner,
                num_intermediate_delegates: numIntermediate,
                num_advanced_delegates: numAdvanced,
                num_spanish_speaking_delegates: numSpanish,
                num_chinese_speaking_delegates: numChinese
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
                <div className="absolute z-10 w-full h-full bg-black opacity-50" onClick={() => setCreatingRegistration(false)}></div>
                <fieldset className="fieldset z-20 bg-base-200 border-base-300 rounded-box w-md border p-4 opacity-100">
                    <h3 className="text-4xl">Register for BMUN {currentConference.session}</h3>
                    <label className="label text-xl">Number of Beginner Delegates</label>
                    <input 
                        type="number" 
                        className="input input-lg w-full"
                        value={numBeginner}
                        onChange={(event) => Number(event.target.value) < 0 ? setNumBeginner(0) : setNumBeginner(Number(event.target.value))}/>
                    
                    <label className="label text-xl">Number of Intermediate Delegates</label>
                    <input 
                        type="number" 
                        className="input input-lg w-full"
                        value={numIntermediate}
                        onChange={(event) => Number(event.target.value) < 0 ? setNumIntermediate(0) : setNumIntermediate(Number(event.target.value))}/>

                    <label className="label text-xl">Number of Advanced Delegates</label>
                    <input 
                        type="number" 
                        className="input input-lg w-full"
                        value={numAdvanced}
                        onChange={(event) => Number(event.target.value) < 0 ? setNumAdvanced(0) : setNumAdvanced(Number(event.target.value))}/>

                    <label className="label text-xl">Number of Spanish Speaking Delegates</label>
                    <input 
                        type="number" 
                        className="input input-lg w-full"
                        value={numSpanish}
                        onChange={(event) => Number(event.target.value) < 0 ? setNumSpanish(0) : setNumSpanish(Number(event.target.value))}/>

                    <label className="label text-xl">Number of Chinese Speaking Delegates</label>
                    <input 
                        type="number" 
                        className="input input-lg w-full"
                        value={numChinese}
                        onChange={(event) => Number(event.target.value) < 0 ? setNumChinese(0) : setNumChinese(Number(event.target.value))}/>
                    <label className="label text-xl">
                        <input type="checkbox" checked={onlinePayment} className="toggle toggle-primary" onChange={(e) => setOnlinePayment(!onlinePayment)} />
                        Pay Online
                    </label>
                    <button 
                        className="btn btn-primary mt-4 text-xl" 
                        onClick={async () => await handleSubmission()}
                        disabled={numBeginner == 0 && numIntermediate == 0 && numAdvanced == 0
                            || numBeginner + numIntermediate + numAdvanced > 40
                        }
                    >
                        {loading ? <span className="loading loading-spinner"></span> : <></>}
                        Register for BMUN
                    </button>
                    {numBeginner + numIntermediate + numAdvanced > 40 ? 
                        <div className="text-md text-red-500">Each school is limited to 40 delegates</div>
                        : <></>
                    }
                </fieldset>
            </div>
        );
    }
};

export default RegistrationForm;
