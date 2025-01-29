"use client"

import { useParams } from "next/navigation"
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"
import dynamic from "next/dynamic"

export default function GamePage() {
    const params = useParams()
    const gameId = params.game as string

    const GameComponent = dynamic(() => import(`@/components/games/${gameId}`), {
        loading: () => <p>Loading game...</p>,
        ssr: false,
    })

    const content = (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Playing: {gameId}</h1>
            <GameComponent />
        </div>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>{gameId}</IonTitle>
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