"use client"

import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import GamesList from "@/components/GamesList"

export default function Games() {
    const content = (
        <div className="w-full mx-auto">
            <div className="relative p-10">
                <div
                    className="absolute inset-0 bg-red-600"
                    style={{
                        clipPath: "ellipse(150% 100% at 50% 0%)",
                        height: "30vh",
                        zIndex: -1,
                    }}
                />

                <div className="pt-8 pb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">Games</h1>
                    <p className="text-xl text-white/90 mb-8">Explore our collection of games created by the CS Club members.</p>

                    <GamesList />
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
                            <IonTitle>Games</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>{content}</IonContent>
                </IonPage>
            ) : (
                <main className="flex-1">{content}</main>
            )}
        </NoSSR>
    )
}