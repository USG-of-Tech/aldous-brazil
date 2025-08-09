'use client'
import { useState } from "react";
import RegistrationModal from "../modals/RegistrationModal";
import SchoolForm from "../forms/SchoolForm";
import RegistrationPanel from "../panels/RegistrationPanel";
import TimelinePanel from "../panels/TimelinePanel";
import FAQPanel from "../panels/FAQPanel";
import OpeningSkeleton from "../skeletons/OpeningSkeleton";

function RegistrationView() {
    const [regLoading, setRegLoading] = useState(true);
    const [creatingRegistration, setCreatingRegistration] = useState(false);
    const [schoolLoading, setSchoolLoading] = useState(false);

    return (
        <div>
            <OpeningSkeleton regLoading={regLoading} />
            <div className={`${regLoading ? 'hidden' : ''} flex flex-col gap-10 p-4 lg:gap-6 lg:p-0 lg:grid lg:order-last lg:grid-cols-2 h-full`}>
                <RegistrationModal creatingRegistration={creatingRegistration} setCreatingRegistration={setCreatingRegistration} />
                <div className={`${regLoading ? 'hidden' : ''} flex flex-col gap-10 justify-start items-start h-full w-full`}>
                    <RegistrationPanel 
                        creatingRegistration={creatingRegistration} 
                        setCreatingRegistration={setCreatingRegistration} 
                        setRegLoading={setRegLoading} />
                    <SchoolForm setSchoolLoading={setSchoolLoading} />
                    <FAQPanel />
                </div>
                <div className={`${regLoading ? 'hidden' : ''} flex flex-col justify-start items-start h-full w-full`}>
                    <TimelinePanel />
                </div>
            </div>
        </div>
    )
}

export default RegistrationView;