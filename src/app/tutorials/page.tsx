"use client"

import Link from "next/link"
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

const tutorials = [
    {
        title: "CS Club App Setup",
        path: "/tutorials/csclub-web-app",
        description: "Learn how to clone, set up, and run the CS Club web app locally.",
    },
    {
        title: "Getting Started with Next.js",
        path: "https://nextjs.org/docs",
        description: "Official Next.js documentation to help you get started with your Next.js projects.",
    },
    {
        title: "React Beginner's Guide",
        path: "https://react.dev/learn",
        description: "A comprehensive guide to learning React, the library used by Next.js.",
    },
    {
        title: "Node.js Basics",
        path: "https://nodejs.dev/en/learn",
        description: "Learn the fundamentals of Node.js, a JavaScript runtime for server-side development.",
    },
    {
        title: "Git and GitHub Guide",
        path: "https://docs.github.com/en/get-started",
        description: "Understand the basics of Git and GitHub for version control and collaboration.",
    },
]

export default function TutorialsPage() {
    const WebTutorials = () => (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold mb-6">Tutorials</h2>
            <div className="space-y-6">
                {tutorials.map((tutorial, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
                        {tutorial.path.startsWith("http") ? (
                            <a href={tutorial.path} target="_blank" rel="noopener noreferrer" className="block">
                                <h3 className="text-2xl font-semibold text-blue-600 hover:underline">{tutorial.title}</h3>
                                <p className="text-gray-600 mt-2">{tutorial.description}</p>
                            </a>
                        ) : (
                            <Link href={tutorial.path}>
                                <div className="cursor-pointer">
                                    <h3 className="text-2xl font-semibold text-blue-600 hover:underline">{tutorial.title}</h3>
                                    <p className="text-gray-600 mt-2">{tutorial.description}</p>
                                </div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )

    const NativeTutorials = () => (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tutorials</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    {tutorials.map((tutorial, index) => (
                        <IonItem
                            key={index}
                            href={tutorial.path}
                            target={tutorial.path.startsWith("http") ? "_blank" : undefined}
                            detail={true}
                        >
                            <IonLabel>
                                <h2>{tutorial.title}</h2>
                                <p>{tutorial.description}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeTutorials /> : <WebTutorials />}</NoSSR>
}