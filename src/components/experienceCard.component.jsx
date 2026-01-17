import {InteractiveCard} from "./lightswind/interactive-card.jsx";

export const ExperienceCardComponent = ({time, title, company, desc, tech}) => {
    return (
        <InteractiveCard
            InteractiveColor="#64FFDA"
            className="glass-card p-6 lg:p-6 group"
        >
            <div className="mb-3">
                <time className="text-xs text-[#64FFDA] uppercase tracking-wider font-medium">
                    {time}
                </time>
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#64FFDA] transition-colors duration-300">
                {title}
            </h3>

            <h4 className="text-md text-[#8892B0] mb-4">
                {company}
            </h4>

            <ul className="text-sm text-[#8892B0] mb-4 ml-5 leading-relaxed list-disc space-y-1">
                {desc.map((i, k) => (
                    <li key={k}>{i}</li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2">
                {tech.map((item, index) => (
                    <span key={index} className="glass-tag">
                        {item}
                    </span>
                ))}
            </div>
        </InteractiveCard>
    );
};

export const ProjectsCard = ({title, url, tech, desc, img, githubUrl}) => {
    return (
        <InteractiveCard
            as="a"
            href={url || githubUrl || "#"}
            target={url || githubUrl ? "_blank" : "_self"}
            rel="noopener noreferrer"
            InteractiveColor="#64FFDA"
            className="glass-card p-0 block group"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Image Section */}
                {img && (
                    <div className="lg:col-span-1 aspect-video lg:aspect-square overflow-hidden bg-[#0A192F]/50">
                        <img
                            src={img}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                )}

                {/* Content Section */}
                <div className={`p-6 ${img ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#64FFDA] transition-colors duration-300">
                            {title}
                        </h3>
                        <svg
                            className="w-5 h-5 text-[#64FFDA] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                    </div>

                    <p className="text-sm text-[#8892B0] mb-4 leading-relaxed line-clamp-3">
                        {desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {tech.map((item, index) => (
                            <span key={index} className="glass-tag text-xs">
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                        {url && (
                            <span className="flex items-center text-[#64FFDA]">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                </svg>
                                Live Demo
                            </span>
                        )}
                        {githubUrl && (
                            <span className="flex items-center text-[#64FFDA]">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                </svg>
                                Source Code
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </InteractiveCard>
    );
};

export const TechnologiesCard = ({title, arr}) => {
    return (
        <InteractiveCard
            InteractiveColor="#64FFDA"
            className="glass-card p-6"
        >
            <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {title}
            </h5>
            <div className="flex flex-wrap gap-2">
                {arr.map((tech, index) => (
                    <span key={index} className="glass-tag">
                        {tech}
                    </span>
                ))}
            </div>
        </InteractiveCard>
    );
};

export const ExperienceLoadingComponent = () => {
    return (
        <div className="glass-card p-6 animate-pulse">
            <div className="space-y-3">
                <div className="h-3 w-24 bg-[#64FFDA]/20 rounded skeleton-glass"></div>
                <div className="h-5 w-3/4 bg-white/20 rounded skeleton-glass"></div>
                <div className="h-4 w-1/2 bg-[#8892B0]/20 rounded skeleton-glass"></div>
                <div className="space-y-2">
                    <div className="h-3 w-full bg-[#8892B0]/20 rounded skeleton-glass"></div>
                    <div className="h-3 w-5/6 bg-[#8892B0]/20 rounded skeleton-glass"></div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <div className="h-6 w-16 bg-[#64FFDA]/20 rounded-full skeleton-glass"></div>
                    <div className="h-6 w-20 bg-[#64FFDA]/20 rounded-full skeleton-glass"></div>
                    <div className="h-6 w-24 bg-[#64FFDA]/20 rounded-full skeleton-glass"></div>
                </div>
            </div>
        </div>
    );
};

export const ProjectLoading = () => {
    return (
        <div className="glass-card p-0 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="lg:col-span-1 aspect-video lg:aspect-square bg-[#0A192F]/50 skeleton-glass"></div>
                <div className="lg:col-span-2 p-6 space-y-3">
                    <div className="h-6 w-3/4 bg-white/20 rounded skeleton-glass"></div>
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-[#8892B0]/20 rounded skeleton-glass"></div>
                        <div className="h-3 w-5/6 bg-[#8892B0]/20 rounded skeleton-glass"></div>
                        <div className="h-3 w-4/6 bg-[#8892B0]/20 rounded skeleton-glass"></div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <div className="h-6 w-16 bg-[#64FFDA]/20 rounded-full skeleton-glass"></div>
                        <div className="h-6 w-20 bg-[#64FFDA]/20 rounded-full skeleton-glass"></div>
                        <div className="h-6 w-24 bg-[#64FFDA]/20 rounded-full skeleton-glass"></div>
                        <div className="h-6 w-18 bg-[#64FFDA]/20 rounded-full skeleton-glass"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};