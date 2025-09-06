import { useRouter } from "next/navigation";

const faqs = [
    {
        question: "When can I register for conference?",
        answer: "The registration button will be made active on the day that registration opens. For the exact date, navigate to the timeline on the right side of the page."
    },
    {
        question: "How do the fees work?",
        answer: "We charge a flat, nonrefundable 60 USD school fee for each registration, and each delegate requires a registration fee of 95 USD."
    },
    {
        question: "What do I do if I want to add or drop delegates?",
        answer: "To add or drop delegates from your registration, contact us at info@bmun.org and tech@bmun.org. We will provide you with a response within 5 business days."
    },
    {
        question: "Will there be a waitlist this year?",
        answer: "If we hit our registration cap prior to the end of any registration period we will automatically transition to the waitlist. The waitlist is on a first-come-first-serve basis with a strict cap on how many each school can register."
    }
]

function FAQPanel() {
    const router = useRouter();
    
    return (
        <div className="bg-black flex flex-col w-full p-4 border-2 border-primary rounded-2xl">
            <h2 className="text-7xl">FAQs</h2>
            <div className="join join-vertical bg-black text-xl rounded-xl">
                <div className="collapse collapse-arrow join-item bg-base-300 border border-base-100" key={-1}>
                    <input type="radio" name="my-accordion-1" defaultChecked />
                    <div className="collapse-title font-semibold">How do I reset my password?</div>
                    <div className="collapse-content text-md hover:cursor-pointer text-primary font-bold" onClick={() => router.push('/reset-password')}>Click Here</div>
                </div>
                {faqs.map((faq, index) => (
                    <div className="collapse collapse-arrow join-item bg-base-300 border border-base-100" key={index}>
                        <input type="radio" name="my-accordion-1" />
                        <div className="collapse-title font-semibold">{faq.question}</div>
                        <div className="collapse-content text-md">{faq.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQPanel;