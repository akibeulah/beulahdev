import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid/index.js";
import { ExperienceCardComponent, ProjectsCard, TechnologiesCard } from "../components/experienceCard.component.jsx";
import ExperienceJson from "../jsons/experience.json"

export const Experience = () => {

    return (
        <div className={"text-sm px-4"}>
            <Link to={"/"} className={"flex flex-row items-center text-sm hover:underline"}>
                <span><ChevronLeftIcon className={"w-5 aspect-square"} /></span>
                <span>Back</span>
            </Link>

            <h4 className={"font-bold text-lg mb-4 text-white mt-8"}>EXPERIENCE</h4>

            <div className="flex flex-col space-y-4">
                {
                    ExperienceJson.map((i, k) =>
                        <ExperienceCardComponent
                            time={i.time}
                            title={i.title}
                            company={i.company}
                            desc={i.desc}
                            tech={i.tech}
                        />
                    )
                }
            </div>
        </div>
    )
}