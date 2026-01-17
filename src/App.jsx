import './App.css'
import 'aos/dist/aos.css';
import {githubLogo, linkedinLogo, mediumLogo} from "./assets/index.js";
import {useEffect, useRef, useState} from "react";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateSiteData} from "./store/reducers/siteDataReducer.js";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AOS from "aos"

function App() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.siteData)
    const canvasRef = useRef(null);
    const background = '#0A192F';
    const [cursorGradient, setCursorGradient] = useState(null)
    const radius = 350; // Increased radius for smoother falloff
    const animationFrameRef = useRef(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const currentPositionRef = useRef({ x: 0, y: 0 });

    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false
    })

    useEffect(() => {
        axios.get("https://api.jsonbin.io/v3/b/66795901acd3cb34a85c767f", {
            headers: {
                "X-Access-Key": "$2a$10$gf.eHfmaQVjYOYb0g7xHMecpYHrXI0Ns81drdB8X8K2i7WjIH.rb6",
                "X-Master-Key": "$2a$10$O8mg5O4345x.InwWkqAyFOq97wImT.FIUB37b2BPFkdg8NWpeE0.K"
            }
        })
            .then(response => {
                dispatch(updateSiteData({name: "projects", value: response.data.record}))
            })
        axios.get("https://api.jsonbin.io/v3/b/667958f8acd3cb34a85c7679", {
            headers: {
                "X-Access-Key": "$2a$10$gf.eHfmaQVjYOYb0g7xHMecpYHrXI0Ns81drdB8X8K2i7WjIH.rb6",
                "X-Master-Key": "$2a$10$O8mg5O4345x.InwWkqAyFOq97wImT.FIUB37b2BPFkdg8NWpeE0.K"
            }
        })
            .then(response => {
                dispatch(updateSiteData({name: "experience", value: response.data.record}))
            })
    }, []);

    function createCursorGradient() {
        const gradient = document.createElement('canvas');
        const size = radius * 2;
        gradient.width = size;
        gradient.height = size;
        const ctx = gradient.getContext('2d', { alpha: true });

        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Create a radial gradient with smoother falloff
        const radialGradient = ctx.createRadialGradient(
            radius,
            radius,
            0,
            radius,
            radius,
            radius
        );

        // Improved color stops for smoother, more subtle gradient
        radialGradient.addColorStop(0, 'rgba(100, 255, 218, 0.15)');     // Center - more subtle
        radialGradient.addColorStop(0.3, 'rgba(100, 255, 218, 0.08)');   // Smooth transition
        radialGradient.addColorStop(0.6, 'rgba(100, 255, 218, 0.03)');   // Further falloff
        radialGradient.addColorStop(1, 'rgba(10, 25, 47, 0)');           // Fully transparent edge

        ctx.fillStyle = radialGradient;
        ctx.fillRect(0, 0, size, size);

        setCursorGradient(gradient);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Smooth interpolation function (lerp)
        const lerp = (start, end, factor) => {
            return start + (end - start) * factor;
        };

        // Animation loop with inertia
        const animate = () => {
            if (!cursorGradient) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            // Smooth following with inertia (adjust 0.08 for more/less drag)
            const smoothingFactor = 0.08;
            currentPositionRef.current.x = lerp(
                currentPositionRef.current.x,
                mousePositionRef.current.x,
                smoothingFactor
            );
            currentPositionRef.current.y = lerp(
                currentPositionRef.current.y,
                mousePositionRef.current.y,
                smoothingFactor
            );

            // Clear canvas
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw gradient at smoothed position
            ctx.globalCompositeOperation = 'lighter';
            ctx.drawImage(
                cursorGradient,
                currentPositionRef.current.x - radius,
                currentPositionRef.current.y - radius
            );
            ctx.globalCompositeOperation = 'source-over';

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Start animation loop
        animate();

        // Mouse move handler - just updates target position
        function handleMouseMove(event) {
            mousePositionRef.current.x = event.clientX;
            mousePositionRef.current.y = event.clientY;
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [cursorGradient]);

    useEffect(() => {
        createCursorGradient()
    }, []);

    return (
        <div className={"bg-[#0A192F] text-[#E6F1FF] font-inter relative"}>
            <ToastContainer/>
            <canvas ref={canvasRef} className={"fixed top-0 left-0 w-full h-full z-0 pointer-events-none"}/>

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-10 px-4 lg:px-8 relative z-10">
                <div className="py-24 lg:px-4 lg:col-span-4 lg:h-screen flex flex-col">
                    <div className="">
                        <div className="mb-4">
                            <h4 className={"ml-0.5 text-sm font-light"}>My name is</h4>
                            <div className="overflow-hidden">
                                <h4 className={"text-4xl lg:text-5xl mb-2 font-bold text-[#64FFDA]"}
                                    data-aos={"slide-down"}>Akindele Beulah</h4>
                            </div>
                            <div className="overflow-hidden">
                                {
                                    state.experience.length === 0 ?
                                        <div className="py-4">
                                            <div
                                                className="block rounded-lg bg-gray-200/10 min-h-[20px] w-3/5 mb-0.5 content-[ ] animate-pulse backdrop-blur-sm"/>
                                            <div
                                                className="block rounded-lg bg-gray-200/10 min-h-[20px] w-2/5 content-[ ] animate-pulse backdrop-blur-sm"/>
                                        </div> :

                                        <h4 className={"text-xl lg:text-2xl font-medium text-[#8892B0]"}
                                            data-aos={"slide-down"}
                                            data-aos-delay={200}>{state.experience[0].title} at {state.experience[0].company}</h4>
                                }
                            </div>
                        </div>

                        <div className="">
                            <p className={"mb-4 text-[#8892B0] leading-relaxed"}>
                                I architect scalable backend systems for mission-critical fintech and banking infrastructure,
                                specializing in payment processing, data migration, and microservices that power
                                critical financial operations.
                            </p>

                            <p className={"text-[#8892B0] leading-relaxed"}>
                                Fun facts about:
                            </p>
                            <ul className={"mb-8 lg:mb-0 ml-8 list-disc text-[#8892B0] leading-relaxed"}>
                                <li>I'm a bit of a minimalist</li>
                                <li>I play guitar in my free time</li>
                                <li>I moonlight as a mechanic</li>
                            </ul>

                            <div className="flex lg:hidden flex-row justify-start items-center mt-8">
                                <a href="https://github.com/akibeulah"
                                   data-aos={"fade-up"}
                                   data-aos-delay={100}
                                   className="mr-4 transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
                                    <img className="w-20 lg:w-24" {...githubLogo} />
                                </a>

                                <a href="https://www.linkedin.com/in/beulah-akindele-8093b9193/"
                                   data-aos={"fade-up"}
                                   data-aos-delay={200}
                                   className="mr-4 transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
                                    <img className="w-20 lg:w-24" {...linkedinLogo} />
                                </a>

                                <a href="https://medium.com/@akibeulah"
                                   data-aos={"fade-up"}
                                   data-aos-delay={300}
                                   className="mr-4 transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
                                    <img className="w-20 lg:w-24" {...mediumLogo} />
                                </a>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col space-y-3 py-8 overflow-hidden">
                            <button className={`uppercase text-sm font-medium lined relative w-fit transition-all duration-300 ${
                                state.landingPageFocus === "about" ? "text-[#64FFDA]" : "text-[#8892B0] hover:text-[#E6F1FF]"
                            }`}
                                    data-aos={"slide-right"}
                                    data-aos-delay={100}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "about"
                                    }))}>About
                            </button>
                            <button className={`uppercase text-sm font-medium lined relative w-fit transition-all duration-300 ${
                                state.landingPageFocus === "experience" ? "text-[#64FFDA]" : "text-[#8892B0] hover:text-[#E6F1FF]"
                            }`}
                                    data-aos={"slide-right"}
                                    data-aos-delay={200}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "experience"
                                    }))}>Experience
                            </button>
                            <button className={`uppercase text-sm font-medium lined relative w-fit transition-all duration-300 ${
                                state.landingPageFocus === "technologies" ? "text-[#64FFDA]" : "text-[#8892B0] hover:text-[#E6F1FF]"
                            }`}
                                    data-aos={"slide-right"}
                                    data-aos-delay={300}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "technologies"
                                    }))}>Technologies
                            </button>
                            <button className={`uppercase text-sm font-medium lined relative w-fit transition-all duration-300 ${
                                state.landingPageFocus === "projects" ? "text-[#64FFDA]" : "text-[#8892B0] hover:text-[#E6F1FF]"
                            }`}
                                    data-aos={"slide-right"}
                                    data-aos-delay={400}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "projects"
                                    }))}>Projects
                            </button>
                            <button className={`uppercase text-sm font-medium lined relative w-fit transition-all duration-300 ${
                                state.landingPageFocus === "contact" ? "text-[#64FFDA]" : "text-[#8892B0] hover:text-[#E6F1FF]"
                            }`}
                                    data-aos={"slide-right"}
                                    data-aos-delay={500}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "contact"
                                    }))}>Contact Me
                            </button>
                        </div>
                    </div>

                    <div className="hidden mt-auto lg:flex flex-row justify-start items-center">
                        <a href="https://github.com/akibeulah"
                           className="mr-4 transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
                            <img className="w-20 lg:w-24" {...githubLogo} />
                        </a>

                        <a href="https://www.linkedin.com/in/beulah-akindele-8093b9193/"
                           className="mr-4 transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
                            <img className="w-20 lg:w-24" {...linkedinLogo} />
                        </a>

                        <a href="https://medium.com/@akibeulah"
                           className="mr-4 transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
                            <img className="w-20 lg:w-24" {...mediumLogo} />
                        </a>
                    </div>
                </div>

                <div
                    className="lg:px-4 lg:py-24 lg:col-span-6 lg:h-screen overflow-x-hidden lg:overflow-scroll scrollbar-none">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default App