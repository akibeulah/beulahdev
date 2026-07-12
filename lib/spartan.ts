const SPARTAN_URL = process.env.SPARTAN_API_URL ?? 'https://spartan-production-5385.up.railway.app'
const SPARTAN_KEY = process.env.SPARTAN_API_KEY ?? ''

const headers = { 'X-Api-Key': SPARTAN_KEY }

function formatDateRange(startDate: string, endDate: string | null) {
    const fmt = (d: string) =>
        new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    return `${fmt(startDate)} — ${endDate ? fmt(endDate) : 'Present'}`
}

export type Experience = {
    time: string
    title: string
    company: string
    desc: string | string[]
    tech: string[]
}

export type Project = {
    title: string
    url: string
    tech: string[]
    desc: string
    img: string
    githubUrl: string
}

export type Education = {
    degree: string
    school: string
    location: string
    startYear: number | string
    endYear: number | string
}

function toExperience(item: Record<string, unknown>): Experience {
    let desc = (item.description as string) || ''
    try { desc = JSON.parse(desc) } catch (_) {}
    return {
        time: formatDateRange(item.startDate as string, item.endDate as string | null),
        title: item.title as string,
        company: item.company as string,
        desc,
        tech: (item.skills as string[]) || [],
    }
}

function toProject(item: Record<string, unknown>): Project {
    const images = item.images as string[] | undefined
    return {
        title: item.title as string,
        url: (item.url as string) || '',
        tech: (item.skills as string[]) || [],
        desc: (item.description as string) || '',
        img: images?.[0] || '',
        githubUrl: (item.githubUrl as string) || '',
    }
}

function toEducation(item: Record<string, unknown>): Education {
    return {
        degree: (item.degree as string) || '',
        school: (item.schoolName as string) || '',
        location: (item.location as string) || '',
        startYear: item.startDate ? new Date(item.startDate as string).getFullYear() : '',
        endYear: item.endDate ? new Date(item.endDate as string).getFullYear() : 'Present',
    }
}

async function spartanFetch(path: string) {
    const res = await fetch(`${SPARTAN_URL}${path}`, { headers, next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Spartan API ${path} → ${res.status}`)
    return res.json()
}

export async function fetchWorkHistory(): Promise<Experience[]> {
    try {
        const json = await spartanFetch('/api/portfolio/work-history')
        return (json.data as Record<string, unknown>[]).map(toExperience)
    } catch {
        return []
    }
}

export async function fetchProjects(): Promise<Project[]> {
    try {
        const json = await spartanFetch('/api/portfolio/projects?limit=50')
        return (json.data as Record<string, unknown>[]).map(toProject)
    } catch {
        return []
    }
}

export async function fetchEducation(): Promise<Education[]> {
    try {
        const json = await spartanFetch('/api/portfolio/education')
        return (json.data as Record<string, unknown>[]).map(toEducation)
    } catch {
        return []
    }
}
