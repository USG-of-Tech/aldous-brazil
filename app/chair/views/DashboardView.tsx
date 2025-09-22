import RubricPanel from "../panels/RubricPanel";

function DashboardView () {
    return (
        <div>
            <div className={`flex flex-col gap-10 p-4 lg:gap-6 lg:p-0 lg:grid lg:order-last lg:grid-cols-2 h-full`}>
                <div className={`flex flex-col gap-10 justify-start items-start h-full w-full`}>
                    <RubricPanel />
                </div>
                <div className={`flex flex-col justify-start items-start h-full w-full`}>
                    <></>
                </div>
            </div>
            <div className={`flex flex-row`}>
                <></>
            </div>
        </div>
    )
}

export default DashboardView;