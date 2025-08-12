import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getSupabaseUser } from "./supabaseHelpers";

export async function autoRedirect(router: AppRouterInstance) {
    try {
        const user_struct = await getSupabaseUser();
        if (user_struct == null) {
            router.push('/login');
            return;
        }
        switch(user_struct.user_type) {
            case 'advisor':
                router.push('/advisor');
                break;
            case 'delegate':
                router.push('/delegate');
                break;
            case 'chair':
                router.push('/chair');
                break;
            case 'admin':
                router.push('/admin');
                break
            default:
    }} catch (error) {
        console.error(error);
        router.push('/login');
    }
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