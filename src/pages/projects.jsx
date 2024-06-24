import {Link} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/20/solid/index.js";
import {ProjectsCard} from "../components/experienceCard.component.jsx";
import {ProjectLoading} from "../components/experienceLoading.component.jsx";
import {useSelector} from "react-redux";

export const Projects = () => {
    const state = useSelector(state => state.siteData)

    return (
        <>
            <div className={"text-sm px-4"}>
                <Link to={"/"} className={"flex flex-row items-center text-sm hover:underline"}>
                    <span><ChevronLeftIcon className={"w-5 aspect-square"}/></span>
                    <span>Back</span>
                </Link>

                <h4 className={"font-bold text-lg mb-4 text-white mt-8"}>Projects</h4>

                <div className="flex flex-col space-y-4">
                    {
                        state.projects.length === 0 ?
                            <>
                                <ProjectLoading/>
                                <ProjectLoading/>
                            </> : state.projects.map((i, k) =>
                                <ProjectsCard
                                    key={k}
                                    keys={k}
                                    title={i.title}
                                    url={i.url}
                                    tech={i.tech}
                                    desc={i.desc}
                                    img={i.img}
                                    githubUrl={i.githubUrl}
                                />
                            )
                    }
                </div>
            </div>
        </>
    )
}