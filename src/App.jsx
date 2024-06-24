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
    const background = '#d27e5a';
    const [cursorGradient, setCursorGradient] = useState(null)
    const radius = 300;
    // const [quoteSelector, setQuoteSelector] = useState(0)
    AOS.init()

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
        gradient.width = 2 * radius;
        gradient.height = 2 * radius;
        const ctx = gradient.getContext('2d');

        // Create a radial gradient from the center to the edges
        const radialGradient = ctx.createRadialGradient(
            radius,
            radius,
            0,
            radius,
            radius,
            radius
        );

        // Add color stops for the gradient (brighter in the center, fading to transparent)
        radialGradient.addColorStop(0, 'rgb(240, 169, 137)');
        radialGradient.addColorStop(1, '#d27e5a');

        ctx.fillStyle = radialGradient;
        ctx.beginPath();
        ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
        ctx.fill();

        setCursorGradient(gradient);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let mouseX = 0;
        let mouseY = 0;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function drawCursorLight() {
            clearCanvas();
            ctx.drawImage(
                cursorGradient,
                mouseX - radius,
                mouseY - radius
            );
        }

        function handleMouseMove(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            drawCursorLight();
        }

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [cursorGradient]);

    useEffect(() => {
        createCursorGradient()
    }, []);

    useEffect(() => {
    }, [])

    return (
        <div className={"bg-[#d27e5a] text-[#10549f] font-inter relative"}>
            <ToastContainer/>
            <canvas ref={canvasRef} className={"absolute top-0 left-0 right-0 bottom-0 h-screen w-screen z-0"}/>

            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-10 px-4 lg:px-8 relative z-10">
                <div className="py-24 lg:px-4 lg:col-span-4 lg:h-screen flex flex-col">
                    <div className="">
                        <div className="mb-4">
                            <h4 className={"ml-0.5 text-sm font-light"}>My name is</h4>
                            <div className="overflow-hidden">
                                <h4 className={"text-4xl lg:text-5xl mb-2 font-bold text-white"}
                                    data-aos={"slide-down"}>Akindele Beulah</h4>
                            </div>
                            <div className="overflow-hidden">
                                {
                                    state.experience.length === 0 ?
                                        <div className="py-4">
                                            <div
                                                className="block rounded-lg bg-gray-200 min-h-[20px] w-3/5 mb-0.5 content-[ ] animate-pulse"/>
                                            <div
                                                className="block rounded-lg bg-gray-200 min-h-[20px] w-2/5 content-[ ] animate-pulse"/>
                                        </div> :

                                        <h4 className={"text-xl lg:text-2xl font-medium"} data-aos={"slide-down"}
                                            data-aos-delay={1000}>{state.experience[0].title} at {state.experience[0].company}</h4>
                                }
                            </div>
                        </div>

                        <div className="">
                            <p className={"mb-8 lg:mb-0"}>
                                I build scalable and efficient tools and services to facilitate project requirements
                                while
                                maintaining industry standards
                            </p>

                            <div className="flex lg:hidden flex-row justify-start items-center">
                                <a href="https://github.com/akibeulah" data-aos={"fade-up"}
                                   className="mr-4">
                                    <img className="w-20 lg:w-24" {...githubLogo} />
                                </a>

                                <a href="https://www.linkedin.com/in/beulah-akindele-8093b9193/" data-aos={"fade-up"}
                                   className="mr-4">
                                    <img className="w-20 lg:w-24" {...linkedinLogo} />
                                </a>

                                <a href="https://medium.com/@akibeulah" data-aos={"fade-up"}
                                   className="mr-4">
                                    <img className="w-20 lg:w-24" {...mediumLogo} />
                                </a>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col space-y-2 py-8 overflow-hidden">
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    data-aos={"slide-right"}
                                    data-aos-delay={200}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "about"
                                    }))}>About
                            </button>
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    data-aos={"slide-right"}
                                    data-aos-delay={400}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "experience"
                                    }))}>Experience
                            </button>
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    data-aos={"slide-right"}
                                    data-aos-delay={600}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "technologies"
                                    }))}>Technologies
                            </button>
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    data-aos={"slide-right"}
                                    data-aos-delay={800}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "projects"
                                    }))}>Projects
                            </button>
                            <button className={"uppercase text-sm font-medium lined relative w-fit"}
                                    data-aos={"slide-right"}
                                    data-aos-delay={1000}
                                    onClick={() => dispatch(updateSiteData({
                                        name: "landingPageFocus",
                                        value: "contact"
                                    }))}>Contact Me
                            </button>
                        </div>
                    </div>

                    {/*<div className="">*/}
                    {/*    <div className="white overflow-hidden">*/}
                    {/*        <div className="p-4 relative">*/}
                    {/*            <span className="absolute top-0 left-0 text-5xl fill-current">"</span>*/}

                    {/*            <blockquote className="text-lg italic mt-2 mb-4">*/}
                    {/*                {state.quotes[quoteSelector].quote}*/}
                    {/*            </blockquote>*/}

                    {/*            <span className="absolute bottom-0 right-0 text-5xl fill-current">"</span>*/}

                    {/*            <p className="text-sm">*/}
                    {/*                <span className="text-lg">-</span>*/}
                    {/*                {state.quotes[quoteSelector].author}*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

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

                <div
                    className="lg:px-4 lg:py-24 lg:col-span-6 lg:h-screen overflow-x-hidden lg:overflow-scroll scrollbar-none">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default App
