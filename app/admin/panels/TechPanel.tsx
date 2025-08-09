'use client';

import { useEffect, useState } from "react";
import ConferenceModal from "../modals/ConferenceModal";
import { ConferenceProps, getConferences } from "@/app/utils/supabaseHelpers";

function TechPanel() {
    const [creatingConference, setCreatingConference] = useState(false)
    const [conferences, setConferences] = useState<ConferenceProps[]>([]);

    const [formData, setFormData] = useState<ConferenceProps>({
        session: 0,
        start_date: "",
        end_date: "",
        reg_open: "",
        round_one_end: "",
        round_one_fees_due: "",
        round_two_end: "",
        round_two_fees_due: "",
        round_three_end: "",
        round_three_fees_due: "",
        round_four_fees_due: "",
        part_refund_deadline: "",
        reg_close: "",
        min_attendance: 0,
        max_attendance: 0,
        advisor_edit_deadline: "",
        early_paper_deadline: "",
        paper_deadline: "",
        waiver_avail_date: "",
        waiver_deadline: "",
        external: "",
        treasurer: "",
        reg_fee: 0,
        del_fee: 0,
        open_reg: false,
        waitlist_reg: false,
        position_papers_accepted: false,
        waiver_link: "N/A",
        current_conference: false
    });
    
    useEffect(() => {(async () => {
        const newConferences = await getConferences();
        setConferences(newConferences)
    })()}, [])

    return (
        <div>
            <ConferenceModal creatingConference={creatingConference} setCreatingConference={setCreatingConference} formData={formData} setFormData={setFormData} />
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 h-full overflow-scroll">
                <div>
                    <h3 className="text-5xl">Tech</h3>
                    <h5 className="text-3xl text-primary">Conference Creation</h5>
                    <p>
                        Here you can edit the conference that you have currently selected, or upload a new 
                        conference. Check your guide for a full explanation on the process
                    </p>
                    <button className="btn btn-secondary mt-2" onClick={() => setCreatingConference(true)}>Create Conference</button>
                </div>
                <div className="border border-base-300 rounded-3xl h-full overflow-auto">
                    <table className="table table-zebra text-lg overflow-auto">
                        <thead>
                        <tr>
                            <th>Conference Session</th>
                            <th>Is Current</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {conferences.map((conference: ConferenceProps, index) => (
                            <tr key={index}>
                            <td>{conference.session}</td>
                            <td>{conference.current_conference ? "✅" : "❌"}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => { 
                                    setFormData(conference);
                                    setCreatingConference(true);
                                }}>Edit Conference </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TechPanel;