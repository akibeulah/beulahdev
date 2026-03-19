import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { updateSiteData } from './store/reducers/siteDataReducer.js'

import CustomCursor from './components/portfolio/CustomCursor.jsx'
import Navbar from './components/portfolio/Navbar.jsx'
import Hero from './components/portfolio/Hero.jsx'
import ProfileSummary from './components/portfolio/ProfileSummary.jsx'
import ExperienceSection from './components/portfolio/ExperienceSection.jsx'
import ProjectsSection from './components/portfolio/ProjectsSection.jsx'
import Education from './components/portfolio/Education.jsx'
import Footer from './components/portfolio/Footer.jsx'

const API_HEADERS = {
    'X-Access-Key': '$2a$10$gf.eHfmaQVjYOYb0g7xHMecpYHrXI0Ns81drdB8X8K2i7WjIH.rb6',
    'X-Master-Key': '$2a$10$O8mg5O4345x.InwWkqAyFOq97wImT.FIUB37b2BPFkdg8NWpeE0.K',
}

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get('https://api.jsonbin.io/v3/b/66795901acd3cb34a85c767f', {
                headers: API_HEADERS,
            })
            .then((res) => dispatch(updateSiteData({ name: 'projects', value: res.data.record })))
            .catch(() => {})

        axios
            .get('https://api.jsonbin.io/v3/b/667958f8acd3cb34a85c7679', {
                headers: API_HEADERS,
            })
            .then((res) => dispatch(updateSiteData({ name: 'experience', value: res.data.record })))
            .catch(() => {})
    }, [dispatch])

    return (
        <div className="relative bg-[#0A0A0F] text-[#F0EDE6] overflow-x-hidden font-dm-mono">
            <CustomCursor />
            <Navbar />
            <main>
                <Hero />
                <ProfileSummary />
                <ExperienceSection />
                <ProjectsSection />
                <Education />
            </main>
            <Footer />
        </div>
    )
}
