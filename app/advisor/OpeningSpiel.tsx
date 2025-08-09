import { currentConference } from "../utils/supabaseHelpers";

export const openingSpiel = <p className="text-xl">
It looks like you have <b>not yet registered for BMUN {currentConference.session}. </b>
In order to do so, please click on the button below to fill out our registration form.
If you need some guidance on the process you can either <span className="font-bold text-primary">navigate to our info page</span>,
to read up about the registration process or watch one of our tutorial videos.
<br/> <br/>
When registering, ensure that your delegation numbers are accurate. 
In order to change any information after submitting the form, an advisor will have to email 
<span className="font-bold text-primary">info@bmun.org</span>.
Please familiarize yourself with our delegate fee deadlines and the associated refund deadlines.
</p>