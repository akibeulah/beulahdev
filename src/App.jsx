import './App.css'
import {githubLogo, linkedinLogo, mediumLogo} from "./assets/index.js";
import {ExperienceCardComponent, ProjectsCard, TechnologiesCard} from "./components/experienceCard.component.jsx";
import {backendTechnologies, databases, devOpsTools, frontendTechnologies, programmingLanguages} from "./utils.js";
import {useEffect, useRef, useState} from "react";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline/index.js";

function App() {
    const canvasRef = useRef(null);
    const [focused, setFocused] = useState("about");
    // const [isHovered, setIsHovered] = useState(false);
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
            const scrollItem = focused === "about" ? aboutRef.current :
                focused === "experience" ? experienceRef.current :
                    focused === "technologies" ? technologiesRef.current :
                        focused === "projects" ? projectsRef.current : contactRef.current
            scrollItem.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
        }
    }, [focused])


    return (
        <div className={"bg-[#3b2f2b] text-[#e0bfb4] font-inter relative"}>
            <canvas ref={canvasRef} className={"absolute top-0 left-0 right-0 bottom-0 h-screen w-screen z-0"}/>

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-10 px-4 lg:px-8 relative z-10">
                <div className="py-24 lg:px-4 lg:col-span-4 lg:h-screen flex flex-col">
                    <div className="">
                        <div className="mb-4">
                            <h4 className={"ml-0.5 text-sm font-light"}>My name is</h4>
                            <h4 className={"text-4xl lg:text-5xl mb-2 font-bold text-white "}>Akindele Beulah</h4>
                            <h4 className={"text-xl lg:text-2xl font-medium"}>Backend Engineer at GetStep</h4>
                        </div>

                        <div className="">
                            <p className={"mb-8 lg:mb-0"}>
                                I build scalable and efficient tools and services to facilitate project requirements
                                while
                                maintaining industry standards
                            </p>

                            <div className="flex lg:hidden flex-row justify-start items-center">
                                <a href="https://github.com/akibeulah"
                                   className="mr-4">
                                    <img className="w-20 lg:w-24" {...githubLogo} />
                                </a>

                                <a href="https://www.linkedin.com/in/beulah-akindele-8093b9193/"
                                   className="mr-4">
                                    <img className="w-20 lg:w-24" {...linkedinLogo} />
                                </a>

                                <a href="https://medium.com/@akibeulah"
                                   className="mr-4">
                                    <img className="w-20 lg:w-24" {...mediumLogo} />
                                </a>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col space-y-2 py-8">
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    onClick={() => setFocused("about")}>About
                            </button>
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    onClick={() => setFocused("experience")}>Experience
                            </button>
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    onClick={() => setFocused("technologies")}>Technologies
                            </button>
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    onClick={() => setFocused("projects")}>Projects
                            </button>
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    onClick={() => setFocused("contact")}>Contact Me
                            </button>
                        </div>
                    </div>

                    <div className="hidden mt-auto lg:flex flex-row justify-start items-center">
                        <a href="https://github.com/akibeulah"
                           className="mr-4">
                            <img className="w-20 lg:w-24" {...githubLogo} />
                        </a>

                        <a href="https://www.linkedin.com/in/beulah-akindele-8093b9193/"
                           className="mr-4">
                            <img className="w-20 lg:w-24" {...linkedinLogo} />
                        </a>

                        <a href="https://medium.com/@akibeulah"
                           className="mr-4">
                            <img className="w-20 lg:w-24" {...mediumLogo} />
                        </a>
                    </div>
                </div>

                <div className="lg:px-4 lg:py-24 lg:col-span-6 lg:h-screen lg:overflow-scroll scrollbar-thin">
                    <div className="">
                        <div className={"mb-16 text-sm"} ref={aboutRef} id="about">
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
                            <h4 className={"font-bold text-lg mb-4 text-white"}>EXPERIENCE</h4>

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
                        </div>

                        <div ref={technologiesRef} id="technologies" className={"mb-16"}>
                            <h4 className={"font-bold text-lg mb-4 text-white"}>TECHNOLOGIES</h4>

                            <div className="flex flex-col space-y-4">
                                <TechnologiesCard title={"Programming Languages"} arr={programmingLanguages}/>
                                <TechnologiesCard title={"Frontend Frameworks"} arr={frontendTechnologies}/>
                                <TechnologiesCard title={"Backend Frameworks"} arr={backendTechnologies}/>
                                <TechnologiesCard title={"Databases"} arr={databases}/>
                                <TechnologiesCard title={"Dev Ops Tools"} arr={devOpsTools}/>
                            </div>
                        </div>

                        <div ref={projectsRef} id="projects" className={"mb-16"}>
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
                        </div>

                        <div ref={contactRef} id="contact" className={"mb-16"}>
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
                                    className={"flex flex-row items-center py-2 px-3 border border-[#e0bfb4] w-fit"}>
                                    <span>Send</span>
                                    <span className={"ml-3"}><PaperAirplaneIcon
                                        className={"w-5 aspect-square -rotate-45"}/></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
