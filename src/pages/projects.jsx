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
                <Link to={"/"}
                      className={"inline-flex items-center text-sm text-[#64FFDA] hover:text-[#64FFDA] mb-8 group transition-all duration-300"}
                      data-aos="fade-right">
                    <ChevronLeftIcon className={"w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform duration-300"}/>
                    <span>Back to Home</span>
                </Link>

                <h4 className={"font-bold text-2xl mb-2 text-white"} data-aos="fade-up">
                    All Projects
                </h4>
                <p className="text-[#8892B0] mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                    A collection of my work spanning fintech infrastructure, web applications, and open-source contributions.
                </p>

                <div className="flex flex-col space-y-4">
                    {
                        state.projects.length === 0 ?
                            <>
                                <ProjectLoading/>
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

                {state.projects.length > 0 && (
                    <div className="mt-12 text-center" data-aos="fade-up">
                        <p className="text-[#8892B0] text-sm">
                            Want to collaborate? <Link to="/#contact" className="text-[#64FFDA] hover:underline">Get in touch</Link>
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}