"use client"

import { useState } from "react"
import {
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
} from "@ionic/react"
import { mailOutline, logoGithub, logoDiscord } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [submitted, setSubmitted] = useState(false)

    {/*
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // In a real implementation, this would send the form data to a server
        window.location.href = `mailto:csclub@minotstateu.edu?subject=Contact from ${name}&body=${message}`
        setSubmitted(true)
    }
    */}

    const WebContact = () => (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col w-full justify-center max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
                        <p className="text-gray-600 mb-6">
                            Have questions about the CS Club or want to get involved? We'd love to hear from you!
                        </p>
                        <div className="space-y-4">
                            <a href="mailto:csclub@minotstateu.edu" className="flex items-center text-red-600 hover:text-red-700">
                                <IonIcon icon={mailOutline} className="w-5 h-5 mr-2" />
                                csclub@minotstateu.edu
                            </a>
                            <a
                                href="https://github.com/MSUCSClub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-600 hover:text-gray-700"
                            >
                                <IonIcon icon={logoGithub} className="w-5 h-5 mr-2" />
                                GitHub
                            </a>
                            <a href="https://discord.gg/WEdBaCeYsa" className="flex items-center text-gray-600 hover:text-gray-700">
                                <IonIcon icon={logoDiscord} className="w-5 h-5 mr-2" />
                                Discord
                            </a>
                        </div>
                    </div>

                    {/*
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                    */}
                </div>
            </div>
        </div>
    )

    const NativeContact = () => (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contact Us</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardContent>
                        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                        <p className="mb-4">
                            Have questions about the CS Club or want to get involved? We'd love to hear from you!
                        </p>
                        <IonItem href="mailto:csclub@minotstateu.edu" detail={true}>
                            <IonIcon icon={mailOutline} slot="start" />
                            <IonLabel>csclub@minotstateu.edu</IonLabel>
                        </IonItem>
                        <IonItem href="https://github.com/MSUCSClub" detail={true}>
                            <IonIcon icon={logoGithub} slot="start" />
                            <IonLabel>GitHub</IonLabel>
                        </IonItem>
                        <IonItem href="https://discord.gg/WEdBaCeYsa" detail={true}>
                            <IonIcon icon={logoDiscord} slot="start" />
                            <IonLabel>Discord</IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>

                {/*
                <IonCard>
                    <IonCardContent>
                        <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <IonItem>
                                <IonLabel position="floating">Name</IonLabel>
                                <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} required />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Message</IonLabel>
                                <IonTextarea value={message} onIonChange={(e) => setMessage(e.detail.value!)} rows={4} required />
                            </IonItem>
                            <IonButton expand="block" type="submit" className="mt-4">
                                Send Message
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard> 
                */}
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeContact /> : <WebContact />}</NoSSR>
}