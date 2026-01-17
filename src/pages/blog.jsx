import {Link} from "react-router-dom";
import {ChevronLeftIcon} from "@heroicons/react/20/solid/index.js";

export const Blog = () => {
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
                    Blog & Articles
                </h4>
                <p className="text-[#8892B0] mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                    Thoughts on software engineering, fintech architecture, and technical leadership.
                </p>

                {/* Coming Soon State */}
                <div className="glass-card p-12 text-center" data-aos="fade-up" data-aos-delay="200">
                    <svg className="w-16 h-16 mx-auto mb-4 text-[#64FFDA] opacity-50"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <h5 className="text-xl font-semibold text-white mb-2">
                        Coming Soon
                    </h5>
                    <p className="text-[#8892B0] mb-6 max-w-md mx-auto">
                        I'm currently working on publishing technical articles about backend architecture,
                        fintech systems, and engineering best practices. Check back soon!
                    </p>
                    <a href="https://medium.com/@akibeulah"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="glass-button inline-block px-6 py-3 rounded-lg text-[#64FFDA] font-medium">
                        Read on Medium
                    </a>
                </div>

                {/* Sample blog post structure - uncomment when you have articles */}
                {/*
                <div className="flex flex-col space-y-4">
                    <article className="glass-card p-6 group cursor-pointer" data-aos="fade-up">
                        <div className="flex items-start justify-between mb-3">
                            <time className="text-xs text-[#64FFDA]">January 15, 2026</time>
                            <span className="glass-tag">Fintech</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#64FFDA] transition-colors">
                            Building Scalable Payment Processing Systems
                        </h3>
                        <p className="text-[#8892B0] mb-4 line-clamp-2">
                            A deep dive into architecting high-throughput payment systems that can handle
                            thousands of transactions per second while maintaining data consistency...
                        </p>
                        <div className="flex items-center text-sm text-[#64FFDA]">
                            <span>Read more</span>
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </article>

                    <article className="glass-card p-6 group cursor-pointer" data-aos="fade-up" data-aos-delay="100">
                        <div className="flex items-start justify-between mb-3">
                            <time className="text-xs text-[#64FFDA]">January 10, 2026</time>
                            <span className="glass-tag">Architecture</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#64FFDA] transition-colors">
                            Microservices vs Monolith: Choosing the Right Architecture
                        </h3>
                        <p className="text-[#8892B0] mb-4 line-clamp-2">
                            An honest discussion about when to use microservices and when a well-structured
                            monolith might be the better choice for your organization...
                        </p>
                        <div className="flex items-center text-sm text-[#64FFDA]">
                            <span>Read more</span>
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </article>
                </div>
                */}

                {/* Newsletter signup */}
                <div className="mt-12 glass-bg p-8 rounded-2xl border border-[#64FFDA]/10" data-aos="fade-up">
                    <h5 className="text-lg font-semibold text-white mb-2">
                        Stay Updated
                    </h5>
                    <p className="text-[#8892B0] mb-4 text-sm">
                        Get notified when I publish new articles about software engineering and fintech.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            className="glass-input flex-1"
                        />
                        <button
                            type="submit"
                            className="glass-button px-6 py-3 rounded-lg text-[#64FFDA] font-medium whitespace-nowrap">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}