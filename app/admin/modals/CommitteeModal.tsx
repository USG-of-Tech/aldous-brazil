'use client';
import { useState } from "react";
import { createCommittee } from "../../utils/supabaseHelpers";

interface CommitteeProps {
    creatingCommittee: boolean,
    setCreatingCommittee: Function
}

function CommitteeModal({creatingCommittee, setCreatingCommittee}: CommitteeProps) {
    const [name, setName] = useState('');
    const [fullName, setFullName] = useState('');
    const [delSize, setDelSize] = useState(0);
    const [special, setSpecial] = useState(false);

    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);

    async function handleSubmission() {
        setLoading(true);
        try {
            const success = await createCommittee({
                name: name.trim(),
                full_name: fullName.trim(),
                delegation_size: delSize,
                special: special,
            });
            if (success) {
                setCreatingCommittee(false);
                setName('');
                setFullName('');
                setDelSize(0);
                setSpecial(false);
            } else {
                setFailed(true);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    if (creatingCommittee) {
        return (
            <div className="absolute inset-0 w-full h-full flex flex-row items-center justify-center">
                <div className="absolute z-10 w-full h-full bg-black opacity-50" onClick={() => setCreatingCommittee(false)}></div>
                <fieldset className="fieldset z-20 bg-base-200 border-base-300 rounded-box w-md border p-4 opacity-100">
                    <h3 className="text-3xl">Create Committee</h3>
                    <label className="label text-lg">Name</label>
                    <input 
                        type="text" 
                        className="input input-lg w-full" 
                        placeholder="UNEP" 
                        value={name}
                        onChange={(event) => setName(event.target.value)}/>

                    <label className="label text-lg">Full Committee Name</label>
                    <input 
                        type="text" 
                        className="input input-lg w-full" 
                        placeholder="The United Nations Environment Programme" 
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}/>

                    <label className="label text-lg">Delegation Size</label>
                    <input 
                        type="number" 
                        className="input input-lg w-full" 
                        placeholder="70"
                        value={delSize}
                        onChange={(event => setDelSize(Number(event.target.value)))}

                    />

                    <label className="label text-lg">
                        <input type="checkbox" checked={special} className="toggle toggle-primary" onChange={(_) => setSpecial(!special)} />
                        Specialized Committee
                    </label>

                    <button 
                        className="btn btn-primary mt-4" 
                        onClick={async () => await handleSubmission()}
                        disabled={name.length == 0 || fullName.length == 0 || delSize == 0}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : <></>}
                        Create Committee
                    </button>
                    {failed ? <label className="label text-red-500">Committee creation failed, please try again</label> : <></>}
                </fieldset>
            </div>
        )
    }
}

export default CommitteeModal;