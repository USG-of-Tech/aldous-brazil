'use client';

import { useState } from "react";
// import { autoRedirect } from "../utils/generalHelper";
// import { useRouter } from 'next/navigation';

import DashboardView from './views/DashboardView';
import PositionPaperView from "./views/PostionPaperView";
import NavBar from "../advisor/panels/NavBar";

function ChairView() {
    const [pageNum, setPageNum] = useState(0);
    // const router = useRouter();

    // TODO: Clean this up too slow rn
    // useEffect(() => {(async () => {
    //     await autoRedirect(router);
    // })()}, [router])

    return (
        <div className="flex flex-col gap-5">
            <div className="h-[68px] w-full" /> {/* Hardcoded placeholder. TODO: Make it dynamic */}
            <NavBar setPageNum={setPageNum}/>
            <div className="w-full h-full flex flex-row justify-center items-center mb-2">
                <div className="max-w-12/12 sm:max-w-[1400px] lg:w-10/12 lg:h-10/12 rounded-md sm:p-4 lg:overflow-scroll">
                    <div className={pageNum != 0 ? 'hidden' : ''}>
                        <DashboardView />
                    </div>
                    <div className={pageNum != 1 ? 'hidden' : ''}>
                        <PositionPaperView />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChairView;