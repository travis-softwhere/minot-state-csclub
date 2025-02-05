"use client"

import Image from "next/image"
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonIcon } from "@ionic/react"
import { calendarOutline, documentTextOutline, ribbonOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

const keyDates = [
    { date: "February 22, 2025", event: "Abstract Submission" },
    { date: "March 1, 2025", event: "Acceptance Notification" },
    { date: "March 22, 2025", event: "Final Paper Submission Deadline" },
    { date: "March 22, 2025", event: "Early Registration Deadline" },
    { date: "March 22, 2025", event: "Contest Registration Deadline" },
    { date: "April 4 & 5, 2025", event: "Conference Dates" },
]

const contests = [
    {
        title: "Programming Contest",
        description: "Student teams of 1-3 students compete against each other to solve programming problems.",
        rules: "Rules for the Programming Contest can be found here.",
        link: "/TiltAHurl_MICS_2025.pdf",
    },
    {
        title: "Robotics Contest",
        description: "Student teams build and program robots to compete in a robotics competition.",
        rules: "Rules for the Robotics Contest can be found here.",
        link: "/ProgrammingRules.jpg",
        sponsor: "DigiKey Electronics",
    },
]

const submissionTypes = [
    {
        title: "Papers",
        description:
            "Papers must provide sufficient details to judge the submission. Student papers are strongly encouraged.",
    },
    {
        title: "Posters",
        description: "Posters can stand-alone or follow up on previous presentations.",
    },
    {
        title: "Nifty Assignments",
        description: "Forum for sharing ideas and materials for innovative classroom assignments.",
    },
]

export default function MICS() {
    const content = (
        <div className="max-w-4xl mx-auto p-4">
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6">
                <Image
                    src="/mics_title.gif"
                    alt="Augsburg University campus"
                    fill
                    className="object-fit"
                    priority
                />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to MICS 2025</h1>
                <h2 className="text-xl text-gray-600 mb-6">
                    Midwest Instruction and Computing Symposium at Augsburg University
                </h2>

                <p className="mb-4">
                    The Midwest Instruction and Computing Symposium (MICS) is a regional conference dedicated to providing real
                    educational experience to students and instructors at higher education institutions. The conference focuses on
                    the teaching of computing and its use in all disciplines.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-red-600 mb-4">Key Dates</h3>
                        <ul className="space-y-2">
                            {keyDates.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <IonIcon icon={calendarOutline} className="w-5 h-5 mr-2 text-gray-600" />
                                    <span>
                                        <strong>{item.event}:</strong> {item.date}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-red-600 mb-4">Location</h3>
                        <p className="mb-4">
                            This year MICS will be held at Augsburg University in the heart of Minneapolis, Minnesota on April 4th and
                            5th.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-red-600 mb-4">Student Contests</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {contests.map((contest) => (
                        <div key={contest.title} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2 flex items-center">
                                <IonIcon icon={ribbonOutline} className="w-5 h-5 mr-2 text-gray-600" />
                                {contest.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">{contest.description}</p>
                            <a href={contest.link} className="text-red-600 hover:text-red-700 text-sm">
                                {contest.rules}
                            </a>
                            {contest.sponsor && <p className="text-sm text-gray-500 mt-2">Sponsored by: {contest.sponsor}</p>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-4">Submissions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {submissionTypes.map((type) => (
                        <div key={type.title} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2 flex items-center">
                                <IonIcon icon={documentTextOutline} className="w-5 h-5 mr-2 text-gray-600" />
                                {type.title}
                            </h4>
                            <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <a
                        href="https://easychair.org/account2/signin?l=3570454404214563412"
                        className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Submit to EasyChair
                    </a>
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
                            <IonTitle>MICS 2025</IonTitle>
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