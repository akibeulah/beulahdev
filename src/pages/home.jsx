import {ExperienceCardComponent, ProjectsCard, TechnologiesCard} from "../components/experienceCard.component.jsx";
import {Link} from "react-router-dom";
import {backendTechnologies, databases, devOpsTools, frontendTechnologies, programmingLanguages} from "../utils.js";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {ContactPage} from "./contact.jsx";
import {ExperienceLoadingComponent, ProjectLoading} from "../components/experienceLoading.component.jsx";
import {FadeUp} from "../components/AnimationWrapper.jsx";

export const Home = () => {
    const state = useSelector(state => state.siteData)
    const aboutRef = useRef(null)
    const experienceRef = useRef(null)
    const technologiesRef = useRef(null)
    const projectsRef = useRef(null)
    const contactRef = useRef(null)

    useEffect(() => {
        if (
            aboutRef.current &&
            experienceRef.current &&
            technologiesRef.current &&
            projectsRef.current &&
            contactRef.current
        ) {
            const scrollItem = state.landingPageFocus === "about" ? aboutRef.current :
                state.landingPageFocus === "experience" ? experienceRef.current :
                    state.landingPageFocus === "technologies" ? technologiesRef.current :
                        state.landingPageFocus === "projects" ? projectsRef.current : contactRef.current
            scrollItem.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
        }
    }, [state.landingPageFocus])

    return (
        <>
            <div className="">
                <div className={"mb-16 text-sm lg:px-4"} ref={aboutRef} id="about">
                    <FadeUp>
                        <h4 className={"font-bold text-lg mb-6 text-white uppercase tracking-wide"}>
                            About
                        </h4>
                    </FadeUp>

                    <div className="space-y-4 text-[#8892B0]">
                        <FadeUp delay={100}>
                            <p className={"text-justify leading-relaxed"}>
                                Principal Fullstack Software Engineer with 4+ years of experience designing, developing, and deploying scalable, high-performance software solutions across fintech, enterprise, and tech-driven environments. I specialize in bridging complex technical systems with business objectives through innovative architecture, automation, and user-focused design.
                            </p>
                        </FadeUp>

                        <FadeUp delay={200}>
                            <p className={"text-justify leading-relaxed"}>
                                At Qore Technologies, I implemented an automation system that reduced operational processing time by <span className="text-[#64FFDA] font-semibold">99.75%</span>, driving significant productivity gains and cost savings. Previously, I delivered enterprise-grade applications supporting foreign exchange trade and risk management operations for major African banks, integrating with Calypso and other finance enterprise platforms. I also developed and optimized machine learning models and APIs that improved production performance by up to <span className="text-[#64FFDA] font-semibold">450%</span>.
                            </p>
                        </FadeUp>

                        <FadeUp delay={300}>
                            <p className={"text-justify leading-relaxed"}>
                                My expertise spans full-stack development, financial systems integration, microservices architecture, and backend optimization. I work across languages and frameworks including C#, JavaScript, Python, Java, and modern DevOps tools such as Docker, AWS, and Kubernetes.
                            </p>
                        </FadeUp>

                        <FadeUp delay={400}>
                            <p className={"text-justify leading-relaxed"}>
                                Beyond engineering, I mentor junior developers, establish best practices, and foster collaborative, high-performing teams. I combine analytical problem-solving with strategic communication to ensure solutions are scalable, resilient, and aligned with business goals.
                            </p>
                        </FadeUp>

                        <FadeUp delay={500}>
                            <p className="text-justify leading-relaxed">
                                Driven by curiosity and continuous learning, I stay engaged with emerging technologies in AI, automation, and financial software architecture. My mission is to build impactful digital products that streamline operations, enhance accessibility, and deliver measurable business results.
                            </p>
                        </FadeUp>
                    </div>
                </div>

                <div ref={experienceRef} id="experience" className={"mb-16"}>
                    <FadeUp>
                        <h4 className={"font-bold text-lg mb-6 text-white lg:px-4 uppercase tracking-wide"}>
                            Experience
                        </h4>
                    </FadeUp>

                    <div className="flex flex-col space-y-4">
                        {
                            state.experience.length === 0 ?
                                <>
                                    <ExperienceLoadingComponent/>
                                    <ExperienceLoadingComponent/>
                                </>
                                :
                                state.experience.slice(0, 2).map((i, k) => (
                                    <FadeUp key={k} delay={k * 100}>
                                        <ExperienceCardComponent
                                            time={i.time}
                                            title={i.title}
                                            company={i.company}
                                            desc={i.desc}
                                            tech={i.tech}
                                        />
                                    </FadeUp>
                                ))
                        }
                    </div>

                    <FadeUp delay={300}>
                        <div className="lg:p-4 text-sm mt-6">
                            <Link to={"/experience"}
                                  className="inline-flex items-center text-[#64FFDA] hover:text-[#64FFDA] group transition-all duration-300">
                                <span className="mr-2">View Full Resume</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </FadeUp>
                </div>

                <div ref={technologiesRef} id="technologies" className={"mb-16 lg:px-4"}>
                    <FadeUp>
                        <h4 className={"font-bold text-lg mb-6 text-white uppercase tracking-wide"}>
                            Technologies
                        </h4>
                    </FadeUp>

                    <div className="flex flex-col space-y-4">
                        <FadeUp delay={0}>
                            <TechnologiesCard title={"Programming Languages"} arr={programmingLanguages}/>
                        </FadeUp>
                        <FadeUp delay={100}>
                            <TechnologiesCard title={"Frontend Frameworks"} arr={frontendTechnologies}/>
                        </FadeUp>
                        <FadeUp delay={200}>
                            <TechnologiesCard title={"Backend Frameworks"} arr={backendTechnologies}/>
                        </FadeUp>
                        <FadeUp delay={300}>
                            <TechnologiesCard title={"Databases"} arr={databases}/>
                        </FadeUp>
                        <FadeUp delay={400}>
                            <TechnologiesCard title={"Dev Ops Tools"} arr={devOpsTools}/>
                        </FadeUp>
                    </div>
                </div>

                <div ref={projectsRef} id="projects" className={"mb-16 lg:px-4"}>
                    <FadeUp>
                        <h4 className={"font-bold text-lg mb-6 text-white uppercase tracking-wide"}>
                            Projects
                        </h4>
                    </FadeUp>

                    <div className="flex flex-col space-y-4">
                        {
                            state.projects.length === 0 ?
                                <>
                                    <ProjectLoading/>
                                    <ProjectLoading/>
                                </> : state.projects.slice(0, 3).map((i, k) => (
                                    <FadeUp key={k} delay={k * 100}>
                                        <ProjectsCard
                                            title={i.title}
                                            url={i.url}
                                            tech={i.tech}
                                            desc={i.desc}
                                            img={i.img}
                                            githubUrl={i.githubUrl}
                                            offset={-1000}
                                        />
                                    </FadeUp>
                                ))
                        }
                    </div>

                    <FadeUp delay={400}>
                        <div className="lg:py-4 text-sm mt-6">
                            <Link to={"/projects"}
                                  className="inline-flex items-center text-[#64FFDA] hover:text-[#64FFDA] group transition-all duration-300">
                                <span className="mr-2">View All Projects</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                     fill="none"
                                     stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </FadeUp>
                </div>

                <div ref={contactRef}>
                    <ContactPage/>
                </div>
            </div>
        </>
    )
}