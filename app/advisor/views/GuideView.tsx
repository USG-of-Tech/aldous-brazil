'use client';

import { useState } from "react";
import GuidePanel from "../panels/GuidePanel";


const guides = [
    {
        videoUrl: "https://www.youtube.com/embed/7pl13eKv4Dw",
        topicTitle: "How to officially register",
        helpfulSnippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa"
    },
    {
        videoUrl: "https://www.youtube.com/embed/7pl13eKv4Dw",
        topicTitle: "How to delegate assignments",
        helpfulSnippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa"
    },
    {
        videoUrl: "https://www.youtube.com/embed/7pl13eKv4Dw",
        topicTitle: "How to reject assignments",
        helpfulSnippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa"
    },
    {
        videoUrl: "https://www.youtube.com/embed/7pl13eKv4Dw",
        topicTitle: "How to request more spots",
        helpfulSnippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa"
    },
    {
        videoUrl: "https://www.youtube.com/embed/7pl13eKv4Dw",
        topicTitle: "How to join the waitlist",
        helpfulSnippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa"
    },
    {
        videoUrl: "https://www.youtube.com/embed/7pl13eKv4Dw",
        topicTitle: "How to not join UCBMUN",
        helpfulSnippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa"
    },
    {
        videoUrl: "https://www.youtube.com/embed/7pl13eKv4Dw",
        topicTitle: "I can't think of another one",
        helpfulSnippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa"
    },
]

function GuideView() {
    const [viewShortcuts, setViewShortcuts] = useState(false);

    const scrollToPanel = (index: number) => {
        const el = document.getElementById(`guide-panel-${index}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            <div className="flex flex-col w-full gap-4 rounded-lg mb-4">
                {/* Help icon */}
                <div className="flex flex-col gap-4 justify-end items-end text-right fixed z-50 bottom-10 right-10 text-primary">
                    <div 
                        className={`${viewShortcuts ? '' : 'translate-x-full opacity-0'} flex flex-col transition duration-300 ease-in-out gap-2 bg-black p-2 rounded-md border-primary border-2`}>
                    {guides.map((guide, index) => (
                        <h5 
                            className="text-4xl hover:cursor-pointer"
                            key={index}
                            onClick={() => scrollToPanel(index)}>
                                {guide.topicTitle}
                        </h5>
                    ))}
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 hover:cursor-pointer bg-black rounded-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        onClick={() => setViewShortcuts(!viewShortcuts)}
                        stroke="currentColor">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                {/* Guides */}
                {guides.map((guide, index) => (
                    <div key={index} id={`guide-panel-${index}`}>
                        {index != 0 ? <div className="divider" /> : <></>}
                        <GuidePanel
                            videoUrl={guide.videoUrl}
                            topicTitle={guide.topicTitle}
                            helpfulSnippet={guide.helpfulSnippet}
                            invert={index % 2 === 1}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GuideView;
