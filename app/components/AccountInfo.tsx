import { useEffect, useState } from "react";
import { signUpAdvisor } from "../utils/supabaseHelpers";

interface AccountStruct {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_c: string,
}

interface AccountProps {
    updatePage: Function,
    setNewId: Function
}

function AccountInfo({updatePage, setNewId}: AccountProps) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')

    const [warningMessage, setWarningMessage] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordCError, setPasswordCError] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Check if the email is valid
        if (email.length > 0) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            setEmailError(!emailRegex.test(email));
        } else {
            setEmailError(false);
        }

        // Check if the passwords match
        if (password != passwordC) {
            setPasswordCError(passwordC.length > 0);
        } else {
            setPasswordCError(false);
        }

        // Check if the password is above 6 characters
        if (password.length > 0) {
            setPasswordError(password.length < 6);
        }
    }, [password, passwordC, email]);

    async function handleCreateAccount() {
        setLoading(true);
        try {
            const newId = await signUpAdvisor(
                firstName,
                lastName,
                email,
                password
            );
            if (typeof newId != 'string') {
                setWarningMessage("Email already in use")
                setLoading(false);
                return;
            }
            setNewId(newId);
            updatePage();
        } catch(error) {
            alert("Sign up failed, please try again");
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-5xl">Sign Up As an Advisor</h2>
            {/*<p className="text-lg">
                If you created an account but were unable to link a school,
                you will be able to link a school after logging into your account on the main page.
            </p>*/}
            <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col">
                    <label className="label text-lg">First Name</label>
                    <input
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        type="text"
                        className="input input-lg w-full"
                        placeholder="Oski" />
                </div>
                <div className="flex flex-col">
                    <label className="label text-lg">Last Name</label>
                    <input
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        type="text"
                        className="input input-lg w-full"
                        placeholder="Bear" />
                    </div>
                <div className="flex flex-col">
                    <label className="label text-lg">Email</label>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="email" id="email"
                        className={`input input-lg w-full ${emailError ? 'input-error' : ''}`}
                        placeholder="oski.bear@bmun.org" />
                </div>
                <div className="flex flex-col">
                    <label className="label text-lg">Password</label>
                    <input
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)}
                        type="password" 
                        className={`input input-lg w-full ${passwordError ? 'input-error' : ''}`}
                        placeholder="Password" />
                </div>
                <div className="flex flex-col">
                    <label className="label text-lg">Password (Confirm)</label>
                    <input value={passwordC}
                        type="password" 
                        onChange={(event) => setPasswordC(event.target.value)}
                        className={`input input-lg w-full ${passwordCError ? 'input-error' : ''}`}
                        placeholder="Password (Confirm)" />
                </div>
                <div>
                    <button
                        className="btn btn-outline btn-lg btn-primary w-full mt-2" 
                        onClick={async (e) => await handleCreateAccount()}
                        disabled={!(email.length > 0 && password.length > 0 && passwordC.length > 0 && !emailError && !passwordError && !passwordCError) || loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : <></>}
                        Create Account
                    </button>
                    {warningMessage.length > 0 ? <div className="validator-hint text-red-400 text-sm">{warningMessage}</div> : <></>}
                </div>
            </div>
        </div>
    )
}

export default AccountInfo;