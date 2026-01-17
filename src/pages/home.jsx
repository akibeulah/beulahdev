import {ExperienceCardComponent, ProjectsCard, TechnologiesCard} from "../components/experienceCard.component.jsx";
import {Link} from "react-router-dom";
import {backendTechnologies, databases, devOpsTools, frontendTechnologies, programmingLanguages} from "../utils.js";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {ContactPage} from "./contact.jsx";
import {ExperienceLoadingComponent, ProjectLoading} from "../components/experienceLoading.component.jsx";

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
                    <h4 className={"font-bold text-lg mb-4 text-white"}>ABOUT</h4>

                    <p className={"mb-4 text-justify"}>
                        Principal Fullstack Software Engineer with 4+ years of experience designing, developing, and deploying scalable, high-performance software solutions across fintech, enterprise, and tech-driven environments. I specialize in bridging complex technical systems with business objectives through innovative architecture, automation, and user-focused design.
                    </p>
                    
                    <p className={"mb-4 text-justify"}>
                    At Qore Technologies, I implemented an automation system that reduced operational processing time by 99.75%, driving significant productivity gains and cost savings. Previously, I delivered enterprise-grade applications supporting foreign exchange trade and risk management operations for major African banks, integrating with Calypso and other finance enterprise platforms. I also developed and optimized machine learning models and APIs that improved production performance by up to 450%.
                    </p>
                    
                     <p className={"mb-4 text-justify"}>
                    My expertise spans full-stack development, financial systems integration, microservices architecture, and backend optimization. I work across languages and frameworks including C#, JavaScript, Python, Java, and modern DevOps tools such as Docker, AWS, and Kubernetes.
                    </p>
                    
                    <p className={"mb-4 text-justify"}>
                        Beyond engineering, I mentor junior developers, establish best practices, and foster collaborative, high-performing teams. I combine analytical problem-solving with strategic communication to ensure solutions are scalable, resilient, and aligned with business goals.
                    </p>
                        
                    <p className="text-justify
                    ">
                        Driven by curiosity and continuous learning, I stay engaged with emerging technologies in AI, automation, and financial software architecture. My mission is to build impactful digital products that streamline operations, enhance accessibility, and deliver measurable business results.
                    </p>
                </div>

                <div ref={experienceRef} id="experience" className={"mb-16"}>
                    <h4 className={"font-bold text-lg mb-4 text-white lg:px-4"}>EXPERIENCE</h4>

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

                    <div className="lg:p-4 text-sm">
                        <Link to={"/experience"}>See all roles</Link>
                    </div>
                </div>

                <div ref={technologiesRef} id="technologies" className={"mb-16 lg:px-4"}>
                    <h4 className={"font-bold text-lg mb-4 text-white"}>TECHNOLOGIES</h4>

                    <div className="flex flex-col space-y-4">
                        <TechnologiesCard title={"Programming Languages"} arr={programmingLanguages}/>
                        <TechnologiesCard title={"Frontend Frameworks"} arr={frontendTechnologies}/>
                        <TechnologiesCard title={"Backend Frameworks"} arr={backendTechnologies}/>
                        <TechnologiesCard title={"Databases"} arr={databases}/>
                        <TechnologiesCard title={"Dev Ops Tools"} arr={devOpsTools}/>
                    </div>
                </div>

                <div ref={projectsRef} id="projects" className={"mb-16 lg:px-4"}>
                    <h4 className={"font-bold text-lg mb-4 text-white"}>PROJECTS</h4>

                    <div className="flex flex-col space-y-4">
                        {
                            state.projects.length === 0 ?
                                <>
                                    <ProjectLoading/>
                                    <ProjectLoading/>
                                </> : state.projects.slice(0, 3).map((i, k) =>
                                    <ProjectsCard
                                        key={k}
                                        keys={k}
                                        title={i.title}
                                        url={i.url}
                                        tech={i.tech}
                                        desc={i.desc}
                                        img={i.img}
                                        githubUrl={i.githubUrl}
                                        offset={-1000}
                                    />
                                )
                        }
                    </div>

                    <div className="lg:py-4 text-sm">
                        <Link to={"/projects"}>See all projects</Link>
                    </div>
                </div>

                <div ref={contactRef}>
                    <ContactPage/>
                </div>
            </div>
        </>
    )
}
