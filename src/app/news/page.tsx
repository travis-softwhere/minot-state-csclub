"use client"

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import InstagramSection from "@/components/InstagramSection"
import News from "@/components/News"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function NewsPage() {
    const content = (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>News & Updates</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <News />
                <InstagramSection />
            </IonContent>
        </>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonPage>{content}</IonPage>
            ) : (
                <main className="flex-1">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-8">News & Updates</h1>
                        {content}
                    </div>
                </main>
            )}
        </NoSSR>
    )
}