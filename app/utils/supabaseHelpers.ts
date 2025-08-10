import { supabase } from "@/supabaseClient";

export async function signUpAdvisor(first_name: string, last_name: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });
    if (error || data.user == null) {
        console.error(error);
        return error;
    }
    const { error: newError } = await supabase.from('Users')
        .insert({
            id: data.user.id, 
            user_type: "advisor",
            first_name: first_name,
            last_name: last_name,
            email: email
        });

    if (newError) {
        console.error(newError);
        return newError;
    }
    return data.user.id;
}

export interface DelegateProps {
    first_name: string,
    last_name: string,
    email: string,
    school_id: number,
    assignment_id: number
}

export async function signUpDelegate(first_name: string, last_name: string, email: string, assignment_id: number) {
    const password = Array.from(crypto.getRandomValues(new Uint8Array(10)))
        .map(n => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[n % 62])
        .join("");

    // Store the current admin session before signUp
    const originalSession = await supabase.auth.getSession().then(({ data }) => data.session);

    if (!originalSession) {
        throw new Error('No session found. Cannot safely continue.');
    }

    // Sign up the new user (this will sign you in as them)
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (signUpError || signUpData == null || signUpData.user == null) {
        console.error('Error creating user:', signUpError);
        return;
    }

    // Restore the original session
    const { error: restoreError } = await supabase.auth.setSession({
        access_token: originalSession.access_token,
        refresh_token: originalSession.refresh_token,
    });

    if (restoreError) {
        console.error('Failed to restore admin session:', restoreError.message);
    } else {
        console.log('Admin session restored.');
    }

    const advisor = await getSupabaseUser();

    const { error: userInsertError } = await supabase.from('Users')
        .insert({
            id: signUpData.user.id, 
            user_type: "delegate",
            first_name: first_name,
            last_name: last_name,
            email: email,
            assignment_id: assignment_id,
            school_id: advisor.school_id
        });

    if (userInsertError) {
        console.error(userInsertError);
        return;
    }
    
    const { data: resetData, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://http://localhost:3000', // Where the user will be sent to set a new password
    });

    if (resetError) {
        console.error('Error sending reset email:', resetError.message);
    } else {
        console.log('Reset email sent:', resetData);
    }
}

export interface SchoolProps {
    id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    zip_code: string,
    country: string,
    primary_name: string,
    primary_email: string,
    primary_phone: string,
    times_attended: number,
    international: boolean,
    secondary_name: string,
    secondary_email: string,
    secondary_phone: string,
    primary_student: boolean,
    secondary_student: boolean,
    delegation_type: string
}

export async function createSchool(schoolProps: SchoolProps) {
    const array = new Int32Array(1);
    crypto.getRandomValues(array);
    const schoolId = array[0]

    schoolProps.id = schoolId;
    const { error } = await supabase.from('School')
        .insert(schoolProps)

    if (error) {
        return error;
    }

    return schoolId;
}

export async function linkSchool(userId: string, schoolId: number) {
    const { error } = await supabase.from('Users')
        .update({ school_id: schoolId })
        .eq('id', userId);

    if (error) {
        console.error(error);
    }
}

export async function getSchool() {
    const user = await getSupabaseUser();

    if (user == null || user.user_type != 'advisor' && user.user_type != 'delegate') {
        console.error("Only advisors can register");
        return;
    }

    const {data, error} = await supabase.from('School')
        .select()
        .eq("id", user.school_id)
        .single();

    if (error) {
        console.error(error);
        return error;
    }

    return data;
}

export async function updateSchool(schoolProps: SchoolProps) {
    const user = await getSupabaseUser();

    const { error } = await supabase.from('School')
        .upsert({...schoolProps, "id": user.school_id})

    if (error) {
        return false;
    }

    return true;
}

export async function loginUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error(error);
        return null;
    } 

    return data.user;
}

export async function logoutUser() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
    }
}

export async function getUser() {
    const response = await supabase.auth.getUser();
    if (response.data.user == null) {
        console.error("User not signed in.");
        return;
    }
    return response.data.user;
}

export async function getSupabaseUser() {
    const response = await supabase.auth.getUser();

    if (response.data.user == null) {
        return null;
    }

    const { data, error } = await supabase.from('Users')
        .select()
        .eq('id', response.data.user.id)
        .single()

    if (error) {
        console.error(error);
    }

    return data;
}

export interface CommitteeProps {
    name: string,
    full_name: string,
    delegation_size: number,
    special: boolean,
}

export async function createCommittee(committeeStruct: CommitteeProps) {
    const { error } = await supabase.from('Committee')
        .insert(committeeStruct);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

export async function getCommittees() {
    const {data, error } = await supabase.from('Committee')
        .select();

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export interface ConferenceProps {
    session: number,
    start_date: string,
    end_date: string,
    reg_open: string,
    round_one_end: string,
    round_one_fees_due: string,
    round_two_end: string,
    round_two_fees_due: string,
    round_three_end: string,
    round_three_fees_due: string,
    round_four_fees_due: string,
    part_refund_deadline: string,
    reg_close: string,
    min_attendance: number,
    max_attendance: number,
    open_reg: boolean,
    waitlist_reg: boolean,
    position_papers_accepted: boolean,
    advisor_edit_deadline: string,
    early_paper_deadline: string,
    paper_deadline: string,
    waiver_avail_date: string,
    waiver_deadline: string,
    waiver_link: string,
    external: string,
    treasurer: string,
    reg_fee: number,
    del_fee: number,
    current_conference: boolean
}

export async function createOrUpdateConference(conferenceStruct: ConferenceProps) {
    const {data:_, error} = await supabase.from("Conference")
        .upsert(conferenceStruct, 
            {onConflict: "session"}
        );
    
    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

export async function getConferences() {
    const {data, error} = await supabase.from('Conference')
        .select();

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export async function getCurrentConference() {
    const {data, error} = await supabase.from('Conference')
        .select()
        .eq("current_conference", true)
        .single()

    if (error) {
        console.error(error);
        return error;
    }

    return data;
}

export const currentConference = await getCurrentConference();

export interface RegistrationProps {
    num_beginner_delegates: number,
    num_intermediate_delegates: number,
    num_advanced_delegates: number,
    num_spanish_speaking_delegates: number,
    num_chinese_speaking_delegates: number,
    delegate_fees_paid: boolean,
    registration_fee_paid: boolean,
    is_waitlisted: boolean
}

export async function getRegistration() {
    const user = await getSupabaseUser();

    if (user == null || user.user_type != 'advisor') {
        console.error("Only advisors can register");
        return;
    }

    const {data, error} = await supabase.from('Registration')
        .select()
        .eq("school_id", user.school_id)
        .single()

    if (error) {
        return;
    }

    return data;
}

export async function createRegistration(registrationStruct: RegistrationProps) {
    const user = await getSupabaseUser();

    if (user == null || user.user_type != 'advisor') {
        console.error("Only advisors can register");
        return;
    }

    const conference = await getCurrentConference();
    const totalDels = registrationStruct.num_beginner_delegates + registrationStruct.num_intermediate_delegates + registrationStruct.num_advanced_delegates;  
    const delFeesOwed = conference.del_fee * totalDels

    const {data:_, error} = await supabase.from('Registration')
        .insert({
            ...registrationStruct,
            "school_id": user.school_id,
            "conference_id": conference.session,
            "delegate_fees_owed": delFeesOwed
        })

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

export interface AssignmentProps {
    id: number,
    committee_id: number,
    committee_name: string,
    country_name: string,
    registration_id: number,
    rejected: boolean,
}

export async function createAssignment(assignmentValues: AssignmentProps) {
    const {data:_, error} = await supabase.from('Assignment')
        .insert(assignmentValues);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

export async function getUsersFromAssignment(assignmentId: number) {
    const {data, error} = await supabase.from('Users')
        .select('*')
        .eq('assignment_id', assignmentId);
    
    if (error || data == null) {
        console.error(error);
        return;
    }

    return data;
}

export async function getDelegatesAsAdvisor() {
    const user = await getSupabaseUser();

    if (user.user_type != 'advisor') {
        console.error('Not an advisor, no delegates to fetch.');
        return [];
    }

    const {data, error} = await supabase.from('Users')
        .select('*')
        .eq('user_type', 'delegate')
        .eq('school_id', user.school_id);
    
    if (error) {
        console.error();
        return [];
    }

    return data;
}

export interface AssignmentUploadProps {
    school_name: string,
    country_name: string,
    committee_name: string
}

async function getRegBySchool(school_name: string) {
    const { data: schoolData, error: schoolError } = await supabase
        .from('School')
        .select('id')
        .eq('name', school_name)
        .single();

    if (schoolError || !schoolData) {
        console.error(schoolError)
        return null;
    }

    const school_id = schoolData.id

    const { data: regData, error: regError } = await supabase
        .from('Registration')
        .select('id')
        .eq('school_id', school_id)
        .single();

    if (regError || !regData) {
        console.error(regError)
        return null;
    }

    return regData.id;
}

async function getCommitteeByName(committee_name: string) {
    const {data, error} = await supabase.from("Committee")
        .select('id')
        .eq('name', committee_name)
        .single();

    if (error) {
        console.error(error);
        return null;
    }
    
    return data.id;
}

export async function uploadAssignments(newAssignments: AssignmentUploadProps[]) {
    newAssignments.forEach(async (assignment: AssignmentUploadProps) => {
        const registration_id = await getRegBySchool(assignment.school_name);
        const committee_id = await getCommitteeByName(assignment.committee_name);
        if (registration_id == null || committee_id == null) {
            console.error("Registration or Committee does not exist");
            alert(`Failed attempting to upload assignment ${assignment.committee_name}. All before listed assignment succeeded`);
        }
        const success = await createAssignment({
            committee_id: parseInt(committee_id),
            committee_name: assignment.committee_name,
            registration_id: parseInt(registration_id),
            country_name: assignment.country_name,
            rejected: false,
            id: Math.floor(Math.random() * 2_147_483_648)
        });
        if (!success) {
            return false;
        }
    })
}

export async function loadAssignments() {
    const registration = await getRegistration();

    if (registration == null) {
        return null;
    } 

    const {data, error} = await supabase.from("Assignment")
        .select("*")
        .eq('registration_id', registration.id);

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function updateAssignment(newAssignment: AssignmentProps) {
    const { error } = await supabase.from("Assignment")
        .upsert(newAssignment);

    if (error) {
        console.error("Failed to reject assignment");
        return false;
    }

    return true;
}

export async function getAmountRegistered() {
    const { data, error } = await supabase.rpc('get_delegate_total_count');

    if (error) {
        console.error('Error fetching delegate count:', error);
        return 0;
    } else {
        console.log('Total delegate count:', data);
        return data;
    }
}

export async function isRegOpen() {

}

export const registrationNumber = await getAmountRegistered();