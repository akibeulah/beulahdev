import {Link} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/20/solid/index.js";
import {ExperienceCardComponent} from "../components/experienceCard.component.jsx";
import {useSelector} from "react-redux";
import {ExperienceLoadingComponent} from "../components/experienceLoading.component.jsx";

export const Experience = () => {
    const state = useSelector(state => state.siteData)

    return (
        <div className={"text-sm px-4"}>
            <Link to={"/"} className={"flex flex-row items-center text-sm hover:underline"}>
                <span><ChevronLeftIcon className={"w-5 aspect-square"}/></span>
                <span>Back</span>
            </Link>

            <h4 className={"font-bold text-lg mb-4 text-white mt-8"}>EXPERIENCE</h4>

            <div className="flex flex-col space-y-4">
                {
                    state.experience.length === 0 ?
                        <>
                            <ExperienceLoadingComponent/>
                            <ExperienceLoadingComponent/>
                        </>
                        :
                        state.experience.slice(0, 2).map((i, k) =>
                            <ExperienceCardComponent
                                key={k}
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