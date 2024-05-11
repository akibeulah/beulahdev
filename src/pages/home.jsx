import { ExperienceCardComponent, ProjectsCard, TechnologiesCard } from "../components/experienceCard.component.jsx";
import { Link } from "react-router-dom";
import { backendTechnologies, databases, devOpsTools, frontendTechnologies, programmingLanguages } from "../utils.js";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ExperienceJson from "../jsons/experience.json";
import ProjectJson from "../jsons/projects.json";
import { ContactPage } from "./contact.jsx";

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
            scrollItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    }, [state.landingPageFocus])

    return (
        <>
            <div className="">
                <div className={"mb-16 text-sm lg:px-4"} ref={aboutRef} id="about">
                    <h4 className={"font-bold text-lg mb-4 text-white"}>ABOUT</h4>

                    <p className={"mb-4 text-justify"}>
                        My programming journey began in 2016 after completing my secondary school studies. Eager
                        to
                        learn, I enrolled in Java and SQL classes, marking the start of my coding adventure. I
                        ventured into Android app development and soon found myself building APIs and web
                        applications, driven by the need for a server. Along the way, I continuously acquired
                        new
                        skills and technologies
                    </p>
                    <p className={"mb-4 text-justify"}>
                        Today, I've had the privilege of working on diverse projects for a range of businesses
                        and
                        individuals, including news agencies, e-commerce firms, fintech companies, and social
                        media
                        agencies. This journey has been incredibly rewarding. Currently, my primary focus lies
                        in
                        developing products and services at GetStep. During my leisure time, I indulge in
                        engineering and programming projects.
                    </p>
                    <p className="text-justify
                    ">
                        Outside of the programming world, I relish long walks, strumming my guitar, and engaging
                        in board games with friends.
                    </p>
                </div>

                <div ref={experienceRef} id="experience" className={"mb-16"}>
                    <h4 className={"font-bold text-lg mb-4 text-white lg:px-4"}>EXPERIENCE</h4>

                    <div className="flex flex-col space-y-4">
                        {
                            ExperienceJson.slice(0, 2).map((i, k) =>
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

                    <div className="lg:p-4 text-sm">
                        <Link to={"/experience"}>See all roles</Link>
                    </div>
                </div>

                <div ref={technologiesRef} id="technologies" className={"mb-16 lg:px-4"}>
                    <h4 className={"font-bold text-lg mb-4 text-white"}>TECHNOLOGIES</h4>

                    <div className="flex flex-col space-y-4">
                        <TechnologiesCard title={"Programming Languages"} arr={programmingLanguages} />
                        <TechnologiesCard title={"Frontend Frameworks"} arr={frontendTechnologies} />
                        <TechnologiesCard title={"Backend Frameworks"} arr={backendTechnologies} />
                        <TechnologiesCard title={"Databases"} arr={databases} />
                        <TechnologiesCard title={"Dev Ops Tools"} arr={devOpsTools} />
                    </div>
                </div>

                <div ref={projectsRef} id="projects" className={"mb-16 lg:px-4"}>
                    <h4 className={"font-bold text-lg mb-4 text-white"}>PROJECTS</h4>

                    <div className="flex flex-col space-y-4">
                        {
                            ProjectJson.slice(0, 3).map((i, k) =>
                                <ProjectsCard
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

                    <div className="lg:py-4 text-sm">
                        <Link to={"/projects"}>See all projects</Link>
                    </div>
                </div>

                <div ref={contactRef}>
                    <ContactPage />
                </div>
            </div>
        </>
    )
}