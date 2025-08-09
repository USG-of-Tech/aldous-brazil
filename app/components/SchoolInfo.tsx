import { useMemo, useState } from "react";
import { createSchool, linkSchool } from "../utils/supabaseHelpers";

interface SchoolInfoProps {
    updatePage: Function,
    newId: string
}

function Schoolinfo({updatePage, newId}: SchoolInfoProps) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('United States')
    const [programType, setProgramType] = useState('Club')
    const [timesAttended, setTimesAttended] = useState(0)

    const [primaryName, setPrimaryName] = useState('')
    const [primaryEmail, setPrimaryEmail] = useState('')
    const [primaryPhone, setPrimaryPhone] = useState('')
    const [primaryStudent, setPrimaryStudent] = useState(false)

    const stringFields = [name, address, city, state, zipCode, country, programType, primaryName, primaryEmail, primaryPhone]
    const buttonDisabled = useMemo(() => {
        return stringFields.some(field => field.length === 0);
      }, [name, address, city, state, zipCode, country, programType, primaryName, primaryEmail, primaryPhone]);
      

    const [secondaryName, setSecondaryName] = useState('')
    const [secondaryEmail, setSecondaryEmail] = useState('')
    const [secondaryPhone, setSecondaryPhone] = useState('')
    const [secondaryStudent, setSecondaryStudent] = useState(false)

    const [international, setInternational] = useState(false)

    const [loading, setLoading] = useState(false)

    async function handleNewSchool() {
        setLoading(true);

        try {
            const schoolId = await createSchool({
                id: 0,
                name: name,
                address: address,
                city: city,
                state: state,
                zip_code: zipCode,
                country: country,
                primary_name: primaryName,
                primary_email: primaryEmail,
                primary_phone: primaryPhone,
                times_attended: timesAttended,
                international: international,
                secondary_name: secondaryName,
                secondary_email: secondaryEmail,
                secondary_phone: secondaryPhone,
                primary_student: primaryStudent,
                secondary_student: secondaryStudent,
                delegation_type: programType
            });
            if (typeof schoolId != 'number') {
                alert("School linking failed, please try again");
                setLoading(false);
                return;
            }
            await linkSchool(newId, schoolId)
        } catch (error) {
            console.error(error);
            alert("School linking failed, please try again");
        }
        
        updatePage();
        setLoading(false);
    }

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-5xl">School Information</h2>
            <p className="text-lg">
            </p>
            <div>
                <h4 className="text-2xl mb-2 text-primary">General Information *</h4>
                <div className="flex flex-col gap-4">
                    <label className="label">
                        <input type="checkbox" checked={international} className="toggle toggle-primary" onChange={(e) => {setInternational(!international); setCountry('')}} />
                        International School (Outside of the United States)
                    </label>
                    <input 
                        type="text" 
                        className="input w-full" 
                        value={name} 
                        placeholder="Offical School Name" 
                        onChange={(event) => setName(event.target.value)} />
                    <input 
                        type="text" 
                        className="input w-full" 
                        value={address} 
                        placeholder="Street Address"
                        onChange={(event) => setAddress(event.target.value)} />
                    <input 
                        type="text" 
                        className="input w-full" 
                        value={city} 
                        placeholder="City" 
                        onChange={(event) => setCity(event.target.value)}/>
                    <input 
                        type="text" 
                        className="input w-full" 
                        value={state} 
                        placeholder={international ? "Province" : "State"} 
                        onChange={(event) => setState(event.target.value)}/>
                    <input 
                        type="text" 
                        className="input w-full" 
                        value={zipCode} 
                        placeholder={international ? "Postal Code" : "ZIP"} 
                        onChange={(event) => setZipCode(event.target.value)}/>
                    <input 
                        type="text" 
                        className="input w-full" 
                        value={country} 
                        placeholder={international ? "Country" : "United States"} 
                        disabled={!international} 
                        onChange={(event) => !international ? setCountry("United States") : setCountry(event.target.value)}/>
                    <select 
                        className="select w-full" 
                        value={programType}
                        onChange={(event) => setProgramType(event.target.value)}>
                        <option value="Club">Club</option>
                        <option value="Class">Class</option>
                    </select>
                    <div className="flex flex-col gap-1">
                        <input 
                            type="tel" 
                            className="input w-full" 
                            value={timesAttended} 
                            placeholder="Amount of times attending BMUN" 
                            onChange={(event) => Number(event.target.value) < 0 ? setTimesAttended(0) : setTimesAttended(Number(event.target.value))}/>
                        <p className="text-sm text-gray-400">Amount of times having attended BMUN</p>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="text-2xl my-2 text-primary">Primary Contact *</h4>
                <div className="flex flex-col gap-4">
                    <label className="label">
                        <input type="checkbox" checked={primaryStudent} className="toggle toggle-primary" onChange={(e) => setPrimaryStudent(!primaryStudent)}  />
                        Student Advisor
                    </label>
                    <input 
                        type="text" 
                        className="input w-full" 
                        value={primaryName}
                        placeholder="Name"
                        onChange={(event) => setPrimaryName(event.target.value)} />
                    <input 
                        type="email" 
                        className="input w-full" 
                        value={primaryEmail}
                        placeholder="Email"
                        onChange={(event) => setPrimaryEmail(event.target.value)} />
                    <input 
                        type="tel" 
                        className="input w-full" 
                        value={primaryPhone}
                        placeholder="Phone Number"
                        onChange={(event) => setPrimaryPhone(event.target.value)} />
                </div>
            </div>
            <div>
                <h4 className="text-2xl my-2 text-primary">Secondary Contact (Optional)</h4>
                <div className="flex flex-col gap-4">
                    <label className="label">
                    <input type="checkbox" checked={secondaryStudent} className="toggle toggle-primary" onChange={(e) => setSecondaryStudent(!secondaryStudent)}  />
                        Student Advisor
                    </label>
                    <input 
                        type="text" 
                        className="input w-full" 
                        value={secondaryName}
                        placeholder="Name" 
                        onChange={(event) => setSecondaryName(event.target.value)}/>
                    <input 
                        type="email" 
                        className="input w-full" 
                        value={secondaryEmail}
                        placeholder="Email" 
                        onChange={(event) => setSecondaryEmail(event.target.value)}/>
                    <input 
                        type="phone" 
                        className="input w-full" 
                        value={secondaryPhone}
                        placeholder="Phone Number" 
                        onChange={(event) => setSecondaryPhone(event.target.value)}/>
                </div>
            </div>
            <div className={`${buttonDisabled ? 'tooltip' : ''} w-full`} data-tip="Please fill out all required forms *">
                <button 
                    className="btn btn-outline btn-primary mt-4 w-full"
                    onClick={async (e) => await handleNewSchool()}
                    disabled={buttonDisabled}
                    >
                    {loading ? <span className="loading loading-spinner"></span> : <></>}
                    Link School
                </button>
            </div>
        </div>
    )
}

export default Schoolinfo;