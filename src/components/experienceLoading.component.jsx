export const ExperienceLoadingComponent = () => {
    return (

        <div
            className={"grid grid-cols-1 md:grid-cols-8 md:gap-4 text-sm rounded-3xl lg:p-4 glass transition duration-300"}>
            <div className="md:col-span-6 w-full">
                <h4 className={"font-bold text-white text-lg mb-2"}><span
                    className="block rounded-lg bg-white min-h-[18px] w-full content-[ ] animate-pulse"/>
                </h4>
                <div className="md:col-span-2 mb-2 font-bold text-white">
                                    <span
                                        className="block rounded-lg bg-white min-h-[14px] w-2/5 content-[ ] animate-pulse"/>
                </div>

                <ul className={"text-sm list-disc mb-2 text-xs"}>
                                    <span
                                        className="block rounded-lg bg-[#6ac9eb] min-h-[12px] mb-1 w-2/3 content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-[#6ac9eb] min-h-[12px] mb-1 w-4/5 content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-[#6ac9eb] min-h-[12px] mb-1 content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-[#6ac9eb] min-h-[12px] mb-1 w-9/10 content-[ ] animate-pulse"/>
                </ul>

                <div className="flex flex-wrap space-x-2 items-center">
                                    <span
                                        className="block rounded-lg bg-[#174859aa] min-h-[18px] mb-1 w-[48px] content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-[#174859aa] min-h-[18px] mb-1 w-[48px] content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-[#174859aa] min-h-[18px] mb-1 w-[48px] content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-[#174859aa] min-h-[18px] mb-1 w-[48px] content-[ ] animate-pulse"/>
                </div>
            </div>
        </div>
    )
}

export const ProjectLoading = () => {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-8 md:gap-4 text-sm"}>
            <div className="md:col-span-2">
                <div className="block rounded-lg bg-gray-200 min-h-[150px] w-full content-[ ] animate-pulse"/>
            </div>
            <div className="md:col-span-6 py-2">
                <div className="block rounded-lg bg-gray-200 min-h-[20px] w-full mb-2 content-[ ] animate-pulse"/>
                <div className="block rounded-lg bg-gray-200 min-h-[14px] w-3/5 mb-2 content-[ ] animate-pulse"/>
                <div className="block rounded-lg bg-gray-200 min-h-[14px] w-4/5 mb-2 content-[ ] animate-pulse"/>
                <div className="block rounded-lg bg-gray-200 min-h-[14px] w-2/3 mb-2 content-[ ] animate-pulse"/>
                <div className="block rounded-lg bg-gray-200 min-h-[14px] w-3/4 mb-2 content-[ ] animate-pulse"/>

                <div className="flex flex-wrap space-x-2 items-center">
                    <span
                        className="block rounded-lg bg-gray-200 min-h-[18px] mb-1 w-[48px] content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-gray-200 min-h-[18px] mb-1 w-[48px] content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-gray-200 min-h-[18px] mb-1 w-[48px] content-[ ] animate-pulse"/>
                    <span
                        className="block rounded-lg bg-gray-200 min-h-[18px] mb-1 w-[48px] content-[ ] animate-pulse"/>
                </div>
            </div>
        </div>
    )
}