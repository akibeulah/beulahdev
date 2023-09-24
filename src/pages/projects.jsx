import {Link} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/20/solid/index.js";

export const Projects = () => {

    return (
        <>
            <div className={"text-sm px-4"}>
                <Link to={"/"} className={"flex flex-row items-center text-sm hover:underline"}>
                    <span><ChevronLeftIcon className={"w-5 aspect-square"} /></span>
                    <span>Back</span>
                </Link>

                <h4 className={"font-bold text-lg mb-4 text-white mt-8"}>Projects</h4>

                <p>Coming soon! Trust me, you'll want to check back.</p>

            </div>
        </>
    )
}