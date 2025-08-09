'use client';

import { ConferenceProps, createOrUpdateConference } from "@/app/utils/supabaseHelpers";
import React, { useState } from "react";

interface ConferenceModalProps {
    creatingConference: boolean,
    setCreatingConference: Function,
    formData: ConferenceProps,
    setFormData: Function
}

function ConferenceForm ({creatingConference, setCreatingConference, formData, setFormData} : ConferenceModalProps) {
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox"
        ? checked
        : name.includes("attendance") || name.includes("reg_fee") || name.includes("del_fee") || name === "session"
        ? parseInt(value)
        : value,
    });
  };

  async function handleSubmission () {
    setLoading(true);
    try {
        const success = await createOrUpdateConference(formData);
        if (success) {
            setCreatingConference(false);
        }
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
    console.log("Form Data Submitted:", formData);
  };

  const isFormComplete = Object.entries(formData).every(([key, value]) => {
    if (typeof value === "number") return !isNaN(value);
    return value !== "";
  });

  if (creatingConference) {
    return (
        <div className="absolute inset-0 w-full h-full flex flex-row items-center justify-center">
            <div className="absolute z-10 w-full h-full bg-black opacity-50" onClick={() => setCreatingConference(false)}>
            </div>
            <fieldset className="fieldset z-20 bg-base-200 border-base-300 rounded-box w-lg h-10/12 overflow-scroll border p-4 opacity-100">
                <h3 className="text-3xl">Create Conference</h3>
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="form-control flex flex-row justify-between">
                        <label className="label text-sm">
                            <span className="label-text capitalize">{key.replace(/_/g, " ")}</span>
                        </label>
                        {typeof value === "boolean" ? 
                            <div className="flex flex-row w-5/12">
                            <input
                                type="checkbox"
                                name={key}
                                checked={formData[key]} // This will give an error but it is fine, we know that it will produce a boolean
                                onChange={handleChange}
                                className="toggle toggle-primary items-end"
                            />
                            </div>
                        :   <input
                                type={typeof value === "number" ? "number" : key == "external" || key == "treasurer" || key == "waiver_link" ? "string" : "date"}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="input input-bordered"
                            />
                        }
                    </div>
                ))}
                <button 
                    type="submit" className="btn btn-primary mt-4"
                    onClick={async () => await handleSubmission()} 
                    disabled={!isFormComplete}>
                    {loading ? <span className="loading loading-spinner"></span> : <></>}
                    Submit
                </button>
            </fieldset>
            
        </div>
    );
    }
};

export default ConferenceForm;
