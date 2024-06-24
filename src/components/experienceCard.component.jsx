import {githubLogo} from "../assets/index.js";

export const ExperienceCardComponent = ({time, title, company, desc, tech, keys, offset}) => {


    return (
        <div data-aos={"slide-right"} data-aos-delay={(parseInt(keys) + 1) * 200} data-aos-offset={offset}
             className={"grid grid-cols-1 md:grid-cols-8 md:gap-4 text-sm rounded-3xl lg:p-4 glass transition duration-300"}>
            <div className="md:col-span-8">
                <h4 className={"font-bold text-white text-lg"}>{title} - {company}</h4>
                <div className="md:col-span-2 mb-2 font-bold text-white">
                    {time}
                </div>

                <ul className={"text-sm list-disc ml-5 mb-2"}>
                    {
                        desc.map((i, k) =>
                            <li key={k}>{i}</li>
                        )
                    }
                </ul>

                <div className="flex flex-wrap space-x-2 items-center">
                    {
                        tech.map((i, k) =>
                            <div
                                className={"text-xs text-[#6ac9eb] my-1 bg-[#174859aa] py-1 px-2 rounded-full whitespace-nowrap"}
                                key={k}>
                                {i}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export const TechnologiesCard = ({title, arr}) => {
    return (
        <>
            <div className={"grid grid-cols-1 md:grid-cols-8 md:gap-4 text-sm"}>
                <div className="md:col-span-2 text-white font-bold">
                    {title}
                </div>
                <div className="md:col-span-6 py-2 lg:py-0">
                    <div className="flex flex-row flex-wrap space-x-2 items-center">
                        {
                            arr.map((i, k) =>
                                <div className={"text-xs text-[#6ac9eb] my-1 bg-[#174859aa] py-1 px-2 rounded-full"}
                                     key={k}>
                                    {i}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export const ProjectsCard = ({title, img, desc, tech, url, githubUrl, keys, offset}) => {
    return (
        <>
            <div data-aos-offset={offset} data-aos={"slide-right"} data-aos-delay={(parseInt(keys) + 1) * 200}
                 className={"grid grid-cols-1 md:grid-cols-8 md:gap-4 text-sm"}>
                <div className="md:col-span-2">
                    <a href={url}>
                        <img src={img} alt={title}/>
                    </a>
                </div>
                <div className="md:col-span-6 py-2">
                    <a href={url}>
                        <h4 className={"text-white font-bold"}>{title}</h4>
                    </a>
                    <p className={"pt-2"}>{desc}</p>
                    {githubUrl ?
                        <a href={githubUrl} className={"block pt-2 pb-3"}>
                            <img className={"w-12"} {...githubLogo}/>
                        </a>
                        : ""}
                    <div className="flex flex-row flex-wrap space-x-2 items-center">
                        {
                            tech.map((i, k) =>
                                <div className={"text-xs text-[#6ac9eb] my-1 bg-[#174859aa] py-1 px-2 rounded-full"}
                                     key={k}>
                                    {i}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}