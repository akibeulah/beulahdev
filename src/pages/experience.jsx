import {Link} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/20/solid/index.js";
import {ExperienceCardComponent} from "../components/experienceCard.component.jsx";
import {useSelector} from "react-redux";
import {ExperienceLoadingComponent} from "../components/experienceLoading.component.jsx";

export const Experience = () => {
    const state = useSelector(state => state.siteData)

    return (
        <div className={"text-sm px-4"}>
            <Link to={"/"}
                  className={"inline-flex items-center text-sm text-[#64FFDA] hover:text-[#64FFDA] mb-8 group transition-all duration-300"}
                  data-aos="fade-right">
                <ChevronLeftIcon className={"w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform duration-300"}/>
                <span>Back to Home</span>
            </Link>

            <h4 className={"font-bold text-2xl mb-2 text-white"} data-aos="fade-up">
                Work Experience
            </h4>
            <p className="text-[#8892B0] mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                My professional journey building scalable systems and leading engineering teams across fintech and enterprise software.
            </p>

            <div className="flex flex-col space-y-4">
                {
                    state.experience.length === 0 ?
                        <>
                            <ExperienceLoadingComponent/>
                            <ExperienceLoadingComponent/>
                            <ExperienceLoadingComponent/>
                        </>
                        :
                        state.experience.map((i, k) =>
                            <ExperienceCardComponent
                                key={k}
                                keys={k}
                                time={i.time}
                                title={i.title}
                                company={i.company}
                                desc={i.desc}
                                tech={i.tech}
                            />
                        )
                }
            </div>

            {state.experience.length > 0 && (
                <div className="mt-12 glass-card p-6" data-aos="fade-up">
                    <h5 className="text-white font-semibold mb-2">Interested in working together?</h5>
                    <p className="text-[#8892B0] mb-4 text-sm leading-relaxed">
                        I'm always open to discussing new opportunities, collaborations, or just connecting with fellow engineers.
                    </p>
                    <Link to="/#contact"
                          className="glass-button inline-block px-6 py-3 rounded-lg text-[#64FFDA] font-medium">
                        Let's Connect
                    </Link>
                </div>
            )}
        </div>
    )
}