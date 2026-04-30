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

const SPARTAN_URL = import.meta.env.VITE_SPARTAN_API_URL || "https://spartan.studiopixels.xyz";
const SPARTAN_KEY = import.meta.env.VITE_SPARTAN_API_KEY || "ak_0d057d263bb25058f06e86a473ca91631cf90f2abaa2bc0591000a340549645b";

const spartanHeaders = { 'X-Api-Key': SPARTAN_KEY }

function formatDateRange(startDate, endDate) {
    const fmt = (d) =>
        new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    return `${fmt(startDate)} — ${endDate ? fmt(endDate) : 'Present'}`
}

function toExperience(item) {
    let desc = item.description || ''
    try { desc = JSON.parse(desc) } catch (_) {}
    return {
        time: formatDateRange(item.startDate, item.endDate),
        title: item.title,
        company: item.company,
        desc,
        tech: item.skills || [],
    }
}

function toProject(item) {
    return {
        title: item.title,
        url: item.url || '',
        tech: item.skills || [],
        desc: item.description || '',
        img: item.images?.[0] || '',
        githubUrl: item.githubUrl || '',
    }
}

function toEducation(item) {
    return {
        degree: item.degree || '',
        school: item.schoolName || '',
        location: item.location || '',
        startYear: item.startDate ? new Date(item.startDate).getFullYear() : '',
        endYear: item.endDate ? new Date(item.endDate).getFullYear() : 'Present',
    }
}

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get(`${SPARTAN_URL}/api/portfolio/work-history`, { headers: spartanHeaders })
            .then((res) =>
                dispatch(updateSiteData({ name: 'experience', value: res.data.data.map(toExperience) }))
            )
            .catch(() => {})

        axios
            .get(`${SPARTAN_URL}/api/portfolio/projects?limit=50`, { headers: spartanHeaders })
            .then((res) =>
                dispatch(updateSiteData({ name: 'projects', value: res.data.data.map(toProject) }))
            )
            .catch(() => {})

        axios
            .get(`${SPARTAN_URL}/api/portfolio/education`, { headers: spartanHeaders })
            .then((res) =>
                dispatch(updateSiteData({ name: 'education', value: res.data.data.map(toEducation) }))
            )
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
