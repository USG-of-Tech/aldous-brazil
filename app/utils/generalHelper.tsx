import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getSupabaseUser, SchoolProps } from "./supabaseHelpers";
import { AccountProps } from "../login/modals/AccountRegistrationModal";

export async function autoRedirect(router: AppRouterInstance) {
    try {
        const user_struct = await getSupabaseUser();
        if (user_struct == null) {
            router.push('/login');
            return;
        }
        router.push(`/${user_struct.user_type}`);
    } catch (error) {
        console.error(error);
        router.push('/login');
    }
}

export async function noLoginRedirect(router: AppRouterInstance) {
    try {
        const user_struct = await getSupabaseUser();
        if (user_struct == null) {
            router.push('/login');
        }
    } catch (error) {
        console.error(error);
        router.push('/login');
    }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidAccountInfo(accountInfo: AccountProps, confPassword: string) {
    if (!Object.values(accountInfo).every(value => value !== "")) {
        return "Missing account information";
    } else if (!isValidEmail(accountInfo.email)) {
        return "Invalid account email";
    } else if (accountInfo.password.length < 8) {
        return "Invalid Password"
    } else if (accountInfo.password != confPassword) {
        return "Passwords do not match"
    }
    return "";
}

export function isValidSchoolInfo(schoolInfo: SchoolProps): string {
    // Required string fields (excluding optional ones)
    const mandatoryFields: (keyof SchoolProps)[] = [
        "name",
        "address",
        "city",
        "state",
        "zip_code",
        "country",
        "primary_name",
        "primary_email",
        "primary_phone",
        "delegation_type"
    ];

    // Check that required fields are not empty
    for (const field of mandatoryFields) {
        const value = schoolInfo[field];
        if (typeof value === "string" && value.trim() === "") {
            return "Missing school information";
        }
    }

    // Validate primary email
    if (!isValidEmail(schoolInfo.primary_email)) {
        return "Invalid advisor email";
    }

    // Check delegation type is not placeholder
    if (schoolInfo.delegation_type === "Delegation Type") {
        return "Please select a valid delegation type";
    }

    return "";
}

export const defaultConferenceData = {
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
};