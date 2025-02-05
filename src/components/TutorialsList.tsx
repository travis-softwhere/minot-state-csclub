"use client"

import Link from "next/link"
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
} from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

const tutorials = [
    {
        title: "CS Club App Setup",
        path: "/tutorials/csclub-web-app",
        description: "Learn how to clone, set up, and run the CS Club web app locally.",
        category: "Web Development",
    },
    {
        title: "Getting Started with Next.js",
        path: "https://nextjs.org/docs",
        description: "Official Next.js documentation to help you get started with your Next.js projects.",
        category: "Web Development",
    },
    {
        title: "React Beginner's Guide",
        path: "https://react.dev/learn",
        description: "A comprehensive guide to learning React, the library used by Next.js.",
        category: "Web Development",
    },
    {
        title: "Node.js Basics",
        path: "https://nodejs.dev/en/learn",
        description: "Learn the fundamentals of Node.js, a JavaScript runtime for server-side development.",
        category: "Web Development",
    },
    {
        title: "Git and GitHub Guide",
        path: "https://docs.github.com/en/get-started",
        description: "Understand the basics of Git and GitHub for version control and collaboration.",
        category: "Version Control",
    },
    {
        title: "Python Data Science Fundamentals",
        path: "https://www.datacamp.com/courses/intro-to-python-for-data-science",
        description: "Learn the basics of data science using Python, including pandas, numpy, and matplotlib.",
        category: "Data Science",
    },
    {
        title: "Machine Learning with Scikit-learn",
        path: "https://scikit-learn.org/stable/tutorial/index.html",
        description: "Introduction to machine learning algorithms using Scikit-learn in Python.",
        category: "Data Science",
    },
    {
        title: "Data Visualization with Plotly",
        path: "https://plotly.com/python/",
        description: "Create interactive and beautiful data visualizations using Plotly in Python.",
        category: "Data Science",
    },
    {
        title: "Capacitor Mobile App Development",
        path: "https://capacitorjs.com/docs/getting-started",
        description: "Build cross-platform mobile apps using Capacitor and web technologies.",
        category: "Mobile Development",
    },
    {
        title: "Ionic Framework with Capacitor",
        path: "https://ionicframework.com/docs/intro",
        description: "Learn how to use Ionic Framework with Capacitor for mobile app development.",
        category: "Mobile Development",
    },
    {
        title: "Native APIs with Capacitor",
        path: "https://capacitorjs.com/docs/apis",
        description: "Explore how to access native device features using Capacitor plugins.",
        category: "Mobile Development",
    },
    {
        title: "3D Printing Basics with Bamboo Lab X1 Plus",
        path: "https://www.bambulab.com/en/x1-series",
        description: "Get started with 3D printing using the Bamboo Lab X1 Plus printer.",
        category: "3D Printing",
    },
    {
        title: "3D Modeling for Printing",
        path: "https://www.autodesk.com/solutions/3d-printing-software",
        description: "Learn 3D modeling techniques specifically for 3D printing projects.",
        category: "3D Printing",
    },
    {
        title: "Advanced 3D Printing Techniques",
        path: "https://all3dp.com/2/advanced-3d-printing-techniques/",
        description: "Explore advanced techniques and materials for 3D printing.",
        category: "3D Printing",
    },
    {
        title: "Robotics with Raspberry Pi",
        path: "https://projects.raspberrypi.org/en/projects/robotics-with-python",
        description: "Build and program robots using Raspberry Pi and Python.",
        category: "Robotics",
    },
    {
        title: "Sensor Integration for Raspberry Pi Robots",
        path: "https://www.tomshardware.com/how-to/connect-sensors-raspberry-pi",
        description: "Learn how to integrate various sensors into your Raspberry Pi robotics projects.",
        category: "Robotics",
    },
    {
        title: "Computer Vision for Robotics",
        path: "https://opencv.org/courses/",
        description: "Implement computer vision techniques in your robotics projects using OpenCV.",
        category: "Robotics",
    },
];

export default function TutorialsList() {
    const WebTutorials = () => (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-red-600">Tutorials</h1>
            {Object.entries(groupTutorialsByCategory()).map(([category, categoryTutorials]) => (
                <div key={category} className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryTutorials.map((tutorial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                {tutorial.path.startsWith("http") ? (
                                    <a href={tutorial.path} target="_blank" rel="noopener noreferrer" className="block h-full">
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-red-600 mb-2">{tutorial.title}</h3>
                                            <p className="text-gray-600">{tutorial.description}</p>
                                        </div>
                                    </a>
                                ) : (
                                    <Link href={tutorial.path} className="block h-full">
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-red-600 mb-2">{tutorial.title}</h3>
                                            <p className="text-gray-600">{tutorial.description}</p>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

    const NativeTutorials = () => (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tutorials</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {Object.entries(groupTutorialsByCategory()).map(([category, categoryTutorials]) => (
                    <div key={category} className="mb-4">
                        <h2 className="text-xl font-semibold px-4 py-2 bg-gray-100">{category}</h2>
                        <IonList>
                            {categoryTutorials.map((tutorial, index) => (
                                <IonCard key={index}>
                                    <IonCardHeader>
                                        <IonCardTitle>{tutorial.title}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p>{tutorial.description}</p>
                                        <IonItem
                                            href={tutorial.path}
                                            target={tutorial.path.startsWith("http") ? "_blank" : undefined}
                                            detail={true}
                                            lines="none"
                                            className="mt-2"
                                        >
                                            <IonLabel color="primary">View Tutorial</IonLabel>
                                        </IonItem>
                                    </IonCardContent>
                                </IonCard>
                            ))}
                        </IonList>
                    </div>
                ))}
            </IonContent>
        </IonPage>
    )

    function groupTutorialsByCategory() {
        return tutorials.reduce(
            (acc, tutorial) => {
                if (!acc[tutorial.category]) {
                    acc[tutorial.category] = []
                }
                acc[tutorial.category].push(tutorial)
                return acc
            },
            {} as Record<string, typeof tutorials>,
        )
    }

    return <NoSSR>{isNativeApp() ? <NativeTutorials /> : <WebTutorials />}</NoSSR>
}