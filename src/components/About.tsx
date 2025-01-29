"use client"
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
} from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function About() {
    const WebContent = () => (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        The CS Club at Minot State University is dedicated to fostering a community of learners interested in
                        computer science and technology.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Do</h3>
                    <ul className="space-y-4 text-gray-600">
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            <span>Organize workshops and coding sessions to enhance programming skills</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            <span>Host guest speakers from the tech industry</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            <span>Participate in programming competitions and hackathons</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">•</span>
                            <span>Provide networking opportunities with industry professionals</span>
                        </li>
                    </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Us</h2>
                        <p className="text-gray-600">
                            We welcome students of all skill levels who are passionate about technology and want to learn more about
                            computer science. Meetings are held weekly during the academic year.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
                        <p className="text-gray-600">
                            Have questions? Reach out to us at{" "}
                            <a href="mailto:csclub@minotstateu.edu" className="text-red-600 hover:text-red-700 underline">
                                csclub@minotstateu.edu
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

    const NativeContent = () => (
        <IonPage>
            <IonContent fullscreen>
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative">
                        <div
                            className="absolute inset-0 bg-red-600"
                            style={{
                                clipPath: "ellipse(150% 100% at 50% 0%)",
                                height: "30vh",
                                zIndex: -1,
                            }}
                        />
                        <div className="pt-8 pb-16">
                            <h1 className="text-4xl font-bold text-white mb-8">About Us</h1>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Our Mission</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <p className="text-lg mb-6">
                                        The CS Club at Minot State University is dedicated to fostering a community of learners interested
                                        in computer science and technology.
                                    </p>

                                    <h3 className="text-xl font-semibold mb-4">What We Do</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Organize workshops and coding sessions to enhance programming skills</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Host guest speakers from the tech industry</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Participate in programming competitions and hackathons</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Provide networking opportunities with industry professionals</span>
                                        </li>
                                    </ul>
                                </IonCardContent>
                            </IonCard>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeContent /> : <WebContent />}</NoSSR>
}