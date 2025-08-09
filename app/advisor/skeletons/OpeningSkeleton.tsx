interface OpeningSkeletonProps {
    regLoading: boolean;
}

function OpeningSkeleton ({regLoading}: OpeningSkeletonProps) {
    return (
        <div className={`${regLoading ? '' : 'hidden'}`}>
            <div className="flex flex-col gap-10 p-4 lg:gap-6 lg:p-0 lg:grid lg:order-last lg:grid-cols-2 h-full">
                <div className="flex flex-col gap-10 justify-start items-start h-full w-full">
                    <div className="skeleton w-full h-128 bg-base-200" />
                    <div className="skeleton w-full h-128 bg-base-200" />
                    <div className="skeleton w-full h-128 bg-base-200" />
                </div>
                <div className="flex flex-col justify-start items-start h-full w-full">
                    <div className="skeleton w-full h-405 bg-base-200" />
                </div>
            </div>
        </div>
    );
}

export default OpeningSkeleton;