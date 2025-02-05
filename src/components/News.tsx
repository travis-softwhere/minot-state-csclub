"use client"

import { useState, useEffect } from "react"
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
    IonButton,
    IonSpinner,
} from "@ionic/react"
import { InstagramFeed } from "@/components/InstagramFeed"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

interface NewsItem {
    id: string
    title: string
    content: string
    date: string
}

const dummyNews: NewsItem[] = [
    {
        id: "1",
        title: "Next CS Club Meeting",
        content: "Wednesday 2/12/24 @ 3:00 PM!",
        date: "2025-01-29",
    },
    {
        id: "2",
        title: "Midwestern Instruction and Computing Symposium",
        content: "April 4th and 5th, 2025",
        date: "04-04-2025 - 04-05-2025",
    },
]

export default function News() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // In a real application, you would fetch news from an API
                // For now, we'll use the dummy data
                setNews(dummyNews)
                setLoading(false)
            } catch (err) {
                setError("Failed to load news. Please try again later.")
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    const WebNews = () => (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Latest News</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <IonSpinner name="crescent" />
                </div>
            ) : error ? (
                <div className="text-red-600 text-center">{error}</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {news.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                                <p className="text-gray-600 mb-4">{item.content}</p>
                                <p className="text-sm text-gray-500">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Instagram Feed</h2>
                <InstagramFeed previewMode={true} />
            </div>
            <div className="mt-8 text-center">
                <a
                    href="/news"
                    className="inline-block bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    View All News
                </a>
            </div>
        </div>
    )

    const NativeNews = () => (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Latest News</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <IonSpinner name="crescent" />
                    </div>
                ) : error ? (
                    <div className="text-red-600 text-center">{error}</div>
                ) : (
                    news.map((item) => (
                        <IonCard key={item.id}>
                            <IonCardHeader>
                                <IonCardTitle>{item.title}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{item.content}</p>
                                <p className="text-sm text-gray-500 mt-2">{new Date(item.date).toLocaleDateString()}</p>
                            </IonCardContent>
                        </IonCard>
                    ))
                )}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Instagram Feed</h2>
                    <InstagramFeed previewMode={true} />
                </div>
                <div className="mt-8 text-center">
                    <IonButton routerLink="/news" expand="block">
                        View All News
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeNews /> : <WebNews />}</NoSSR>
}