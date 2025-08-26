'use client'
import { useState } from "react";
import RegistrationModal from "../modals/RegistrationModal";
import SchoolForm from "../forms/SchoolForm";
import RegistrationPanel from "../panels/RegistrationPanel";
import TimelinePanel from "../panels/TimelinePanel";
import FAQPanel from "../panels/FAQPanel";
import OpeningSkeleton from "../skeletons/OpeningSkeleton";

interface RegistrationViewProps {
    setPageNum: Function
}

function RegistrationView({setPageNum}: RegistrationViewProps) {
    const [regLoading, setRegLoading] = useState(true);
    const [creatingRegistration, setCreatingRegistration] = useState(false);
    const [_, setSchoolLoading] = useState(false);

    return (
        <div>
            <OpeningSkeleton regLoading={regLoading} />
            <div className={`${regLoading ? 'hidden' : ''} flex flex-col gap-10 p-4 lg:gap-6 lg:p-0 lg:grid lg:order-last lg:grid-cols-2 h-full`}>
                <RegistrationModal creatingRegistration={creatingRegistration} setCreatingRegistration={setCreatingRegistration} />
                <div className={`${regLoading ? 'hidden' : ''} flex flex-col gap-10 justify-start items-start h-full w-full`}>
                    <RegistrationPanel
                        setCreatingRegistration={setCreatingRegistration} 
                        setRegLoading={setRegLoading}
                        setPageNum={setPageNum} />
                    <SchoolForm setSchoolLoading={setSchoolLoading} />
                    <FAQPanel />
                </div>
                <div className={`${regLoading ? 'hidden' : ''} flex flex-col justify-start items-start h-full w-full pb-24`}>
                    <TimelinePanel />
                </div>
            </div>
        </div>
    )
}

export default RegistrationView;