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
import membersData from "@/data/members.json"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

type Member = {
    _id: string
    name: string
    email: string
    role: string
}

export default function MembersList() {
    const [members, setMembers] = useState<Member[]>([])

    useEffect(() => {
        setMembers(membersData)
    }, [])

    const NativeContent = () => (
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

    const WebContent = () => (
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

    return <NoSSR>{isNativeApp() ? <NativeContent /> : <WebContent />}</NoSSR>
}