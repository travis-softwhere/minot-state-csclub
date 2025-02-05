"use client"

import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonIcon } from "@ionic/react"
import { documentTextOutline, downloadOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const documents = [
    {
        title: "Club Constitution",
        description: "The official constitution and bylaws of the Minot State CS Club.",
        path: "/2025CSClubConstitution.pdf",
        lastUpdated: "2025",
    },
]

export default function ClubDocuments() {
    const content = (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Club Documents</h1>
                <p className="text-gray-600 mb-8">
                    Access important CS Club documents and resources. These documents govern our organization and outline our
                    operational procedures.
                </p>

                <div className="grid gap-4">
                    {documents.map((doc) => (
                        <Link href={doc.path} className="flex items-center gap-2">
                            <Card key={doc.title} className="transition-all hover:shadow-lg w-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <IonIcon icon={documentTextOutline} className="w-5 h-5 text-red-600" />
                                        {doc.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <p className="text-gray-600 mb-2">{doc.description}</p>
                                            <p className="text-sm text-gray-500">Last Updated: {doc.lastUpdated}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Club Documents</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">{content}</IonContent>
                </IonPage>
            ) : (
                <main className="min-h-screen bg-gray-50 py-8">{content}</main>
            )}
        </NoSSR>
    )
}