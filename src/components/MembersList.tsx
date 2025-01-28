"use client"

import { useEffect, useState } from "react"
import {
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
} from "@ionic/react"

type Member = {
    _id: string
    name: string
    email: string
    role: string
}

// Function to check if we're in an Ionic environment
const isIonicEnvironment = () => {
    return typeof (window as any).Ionic !== "undefined"
}

export default function MembersList() {
    const [members, setMembers] = useState<Member[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isIonic, setIsIonic] = useState(false)

    useEffect(() => {
        setIsIonic(isIonicEnvironment())

        const fetchMembers = async () => {
            try {
                const response = await fetch("/api/members")
                const data = await response.json()
                setMembers(data)
            } catch (error) {
                setError("Failed to fetch members")
            }
        }

        fetchMembers()
    }, [])

    if (error) {
        return <div className="text-red-600">{error}</div>
    }

    if (isIonic) {
        return (
            <IonContent>
                <div className="p-8">
                    <h2 className="text-4xl font-bold mb-4">CS Club Members</h2>
                    <IonList>
                        {members.map((member) => (
                            <IonItem key={member._id}>
                                <IonLabel>
                                    <h2>{member.name}</h2>
                                    <p>Email: {member.email}</p>
                                    <p>Role: {member.role}</p>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                </div>
            </IonContent>
        )
    }

    return (
        <div className="p-8">
            <h2 className="text-4xl font-bold mb-4">CS Club Members</h2>
            <ul className="space-y-4">
                {members.map((member) => (
                    <li key={member._id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-2xl font-bold">{member.name}</h3>
                        <p>Email: {member.email}</p>
                        <p>Role: {member.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}