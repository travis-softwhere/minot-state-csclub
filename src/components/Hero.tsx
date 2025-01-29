"use client";

import { IonButton } from "@ionic/react"
import Link from "next/link"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function Hero() {
    const HeroContent = () => (
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">CS Club Meeting!</h1>
                <p className="mt-6 text-xl sm:text-2xl max-w-3xl">
                    Join us at 3:00 PM in Model 113. We're looking for people to help with:
                </p>
                <ul className="mt-4 text-lg sm:text-xl list-disc list-inside space-y-2">
                    <li>AI / Data Science research</li>
                    <li>Web application development</li>
                    <li>Robotics</li>
                    <li><Link href="/news" className="underline">Midwestern Instruction and Computing Symposium</Link></li>
                    <li>Getting more involved in the CS Club</li>
                </ul>
                <p className="mt-6 text-2xl font-semibold">Free Pizza for all attendees!</p>
            </div>
        </div >
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <HeroContent />
            ) : (
                <section className="relative overflow-hidden">
                    <HeroContent />
                </section>
            )}
        </NoSSR>
    )
}