import { currentConference } from "../utils/supabaseHelpers";

interface RegProps {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_c: string,
}

function AccountInfo({}: RegProps) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-5xl">Registration Information</h2>
            <p className="text-lg">
                Finally, fill out the following information to fully register your school for BMUN {currentConference.session}! You will be able to view 
                this information in your advisor account and request any desired changes once you have submitted this form.
            </p>
            <div className="flex flex-col gap-4">
                <input type="text" className="input w-full" placeholder="First Name" />
                <input type="text" className="input w-full" placeholder="Last Name" />
                <input type="email" className="input w-full" placeholder="Email" />
                <input type="password" className="input w-full" placeholder="Password" />
                <input type="password" className="input w-full" placeholder="Password (Confirm)" />
            </div>
        </div>
    )
}

export default AccountInfo;