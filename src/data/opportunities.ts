export type Opportunity = {
    id: string
    title: string
    description: string
    path: string
    date?: string
    deadline?: string
}

export type OpportunitySection = {
    id: string
    title: string
    description: string
    opportunities: Opportunity[]
}

export const opportunitySections: OpportunitySection[] = [
    {
        id: "research",
        title: "Research Opportunities",
        description: "Explore undergraduate research opportunities in computer science and related fields.",
        opportunities: [
            {
                id: "uwec-reu-2025",
                title: "UW-Eau Claire REU Summer 2025",
                description: "Research experience in high-performance computing at UW-Eau Claire.",
                path: "/opportunities/research",
                date: "June 2 - August 1, 2025",
                deadline: "March 1, 2025",
            },
        ],
    },
]  