import {ExperienceCardComponent, ProjectsCard, TechnologiesCard} from "../components/experienceCard.component.jsx";
import {Link} from "react-router-dom";
import {backendTechnologies, databases, devOpsTools, frontendTechnologies, programmingLanguages} from "../utils.js";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline/index.js";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";

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

                    <p className={"mb-4"}>
                        My programming journey began in 2016 after completing my secondary school studies. Eager
                        to
                        learn, I enrolled in Java and SQL classes, marking the start of my coding adventure. I
                        ventured into Android app development and soon found myself building APIs and web
                        applications, driven by the need for a server. Along the way, I continuously acquired
                        new
                        skills and technologies
                    </p>
                    <p className={"mb-4"}>
                        Today, I've had the privilege of working on diverse projects for a range of businesses
                        and
                        individuals, including news agencies, e-commerce firms, fintech companies, and social
                        media
                        agencies. This journey has been incredibly rewarding. Currently, my primary focus lies
                        in
                        developing products and services at GetStep. During my leisure time, I indulge in
                        engineering and programming projects.
                    </p>
                    <p>
                        Outside of the programming world, I relish long walks, strumming my guitar, and engaging
                        in
                        board games with friends
                    </p>
                </div>

                <div ref={experienceRef} id="experience" className={"mb-16"}>
                    <h4 className={"font-bold text-lg mb-4 text-white lg:px-4"}>EXPERIENCE</h4>

                    <div className="flex flex-col space-y-4">
                        <ExperienceCardComponent
                            time={"March 2023 - Present"}
                            title={"Backend Engineer"}
                            company={"GetStep"}
                            desc={[
                                "Developed and implemented a hybrid recommendation engine that harnessed user interactions and posts to provide personalized post and community recommendations.",
                                "Engineered a microservice-based architecture for the recommendation engine, contributing to system scalability and resource efficiency.",
                                "Leveraged PostgreSQL stored procedures to optimize database interactions specifically within the wallet service microservice.",
                                "Integrated the recommendation engine and wallet features, collaborating with banking NIP infrastructures to streamline customer payment management.",
                                "Designed and developed wallet functionalities as microservices within the architecture, ensuring modularity and maintainability."
                            ]}
                            tech={["C#", ".NET Core", "Python", "Django", "PostgreSQL"]}
                        />

                        <ExperienceCardComponent
                            time={"Oct 2022 - Feb 2023"}
                            title={"Software Developer"}
                            company={"TBO Consulting Group"}
                            desc={[
                                "Led the complete revamp of the company's website, enhancing the brand's digital presence and user experience.",
                                "Worked on a secure JWT-based authentication system using PassportJS and applied an authorization system,\n" +
                                "enhancing platform security and data integrity.",
                                "Created a user network for storing user data and generating talent recommendations based on skills, improving\n" +
                                "efficiency and personalization.",
                                "Formulated and applied a responsive front-end application using Redux and React Router, improving data\n" +
                                "accessibility and platform efficiency.",
                                "Built a robust project management system and automated key processes, including the Talent as a Service\n" +
                                "(TaaS) pipeline, calendar scheduling, and email notifications, leading to improved time-to-delivery and user\n" +
                                "engagement.",
                            ]}
                            tech={["JavaScript", "React", "Express", "MongoDB", "NodeJS"]}
                        />

                        <ExperienceCardComponent
                            time={"Jun 2021 - Sep 2022"}
                            title={"Full Stack Developer"}
                            company={"RILA INVESTMENT"}
                            desc={[
                                "Engineered a robust front-end application utilizing ReactJS, serving as the public-facing interface and\n" +
                                "administrative access point, significantly improving the company's online presence",
                                "Constructed a highly scalable backend API with Django, providing streamlined service management and\n" +
                                "optimized efficiency across the company's digital infrastructure.",
                                "Constructed a secure administrative module, implementing granular authentication and authorization systems.\n" +
                                "This ensured appropriate access control based on user roles, including engineering staff, administrative staff,\n" +
                                "inventory personnel, and superusers.",
                                "Planned and deployed a comprehensive inventory management system integrated into the website. This system\n" +
                                "tracks material and component transactions, including origin and destination data, and the personnel involved,\n" +
                                "ensuring real-time accuracy and accountability",
                                "Created an innovative battery monitoring device for efficient evaluation of battery life cycles. This device is\n" +
                                "crucial for ensuring the quality of reused batteries, aligning with the commitment to sustainability in the solar\n" +
                                "energy industry"
                            ]}
                            tech={["JavaScript", "React", "Python", "Django", "PostgreSQL"]}
                        />

                        <ExperienceCardComponent
                            time={"May 2021 - Dec 2021"}
                            title={"Software Engineer (Internship)"}
                            company={"BOLDSCALE"}
                            desc={[
                                "Worked with a team to develop and deploy a browser forked from the chromium project.",
                                "Developed stand-alone VPN solutions to be integrated with the browser using open-source technologies."
                            ]}
                            tech={["C/C++", "Java"]}
                        />
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
                        <ProjectsCard
                            title={"Beulah's Development Portfolio"}
                            url={"https://beulahdev.onrender.com"}
                            tech={["JavaScript", "React"]}
                            desc={"Designed and developed a portfolio website, showcasing proficiency in web development and design with a focus on user experience"}
                            img={"https://i.ibb.co/BjvM9BN/Screenshot-from-2023-09-11-23-01-02.png"}
                            githubUrl={"https://github.com/akibeulah/beulahdev"}
                        />

                        <ProjectsCard
                            title={"Todo Application"}
                            url={"https://todoapp-3esd.onrender.com"}
                            tech={["JavaScript", "TypeScript", "React"]}
                            desc={"Built a Todo application using React and TypeScript, demonstrating proficiency in modern web development and delivering a user-friendly interface."}
                            img={"https://i.ibb.co/2YNWK1d/Screenshot-from-2023-09-11-22-33-38.png"}
                            githubUrl={"https://github.com/akibeulah/TodoApp"}
                        />

                        <ProjectsCard
                            title={"Stalking Shadows React Library"}
                            url={"https://timely-kleicha-2df130.netlify.app/"}
                            tech={["JavaScript", "TypeScript", "React"]}
                            desc={"A ReactJS library component for creating dynamic text shadows that shift with mouse movement or page scroll."}
                            img={"https://i.ibb.co/dgWNCF1/Screenshot-from-2023-09-11-22-45-32.png"}
                            githubUrl={"https://github.com/akibeulah/stalking-shadows"}
                        />
                    </div>

                    <div className="lg:py-4 text-sm">
                        <Link to={"/projects"}>See all projects</Link>
                    </div>
                </div>

                <div ref={contactRef} id="contact" className={"mb-16 lg:px-4"}>
                    <h4 className={"font-bold text-lg mb-4 text-white"}>CONTACT ME</h4>

                    <div className="flex flex-col">
                        <div className="mb-4 w-full">
                            <input type="text" placeholder={"Fullname"}
                                   className={"bg-transparent border  p-2 px-4 rounded  w-full border-[#e0bfb4] outline-none"}/>
                        </div>
                        <div className="mb-4 w-full">
                            <input type="email" placeholder={"Email"}
                                   className={"bg-transparent border  p-2 px-4 rounded  w-full border-[#e0bfb4] outline-none"}/>
                        </div>
                        <div className="mb-6 w-full">
                            <input type="phone" placeholder={"Phone Number"}
                                   className={"bg-transparent border  p-2 px-4 rounded  w-full border-[#e0bfb4] outline-none"}/>
                        </div>
                        <div className="w-full mb-4">
                                <textarea placeholder={"Message"}
                                          className={"bg-transparent border  p-2 px-4 rounded w-full block border-[#e0bfb4] outline-none"}/>
                        </div>

                        <button
                            className={"flex flex-row items-center py-2 px-3 border border-[#e0bfb4] w-fit hover:bg-[#174859aa] hover:text-[#6ac9eb] hover:border-[#6ac9eb] duration-300"}>
                            <span>Send</span>
                            <span className={"ml-3"}><PaperAirplaneIcon
                                className={"w-5 aspect-square -rotate-45"}/></span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}