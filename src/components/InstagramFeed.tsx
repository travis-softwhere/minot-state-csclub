"use client"

import { useState, useEffect } from "react"
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonIcon,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/react"
import { logoInstagram } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"

interface InstagramPost {
    id: string
    media_type: string
    media_url: string
    permalink: string
    caption?: string
    thumbnail_url?: string
    timestamp: string
}

interface InstagramFeedProps {
    previewMode?: boolean
}

export function InstagramFeed({ previewMode = false }: InstagramFeedProps) {
    const [posts, setPosts] = useState<InstagramPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let retryCount = 0
        const maxRetries = 3

        const fetchWithRetry = async () => {
            try {
                await fetchPosts()
            } catch {
                if (retryCount < maxRetries) {
                    retryCount++
                    console.log(`Retrying fetch (${retryCount}/${maxRetries})...`)

                    setTimeout(fetchWithRetry, 1000 * retryCount)
                } else {
                    setError("Unable to load Instagram posts.")
                    setLoading(false)
                }
            }
        }

        fetchWithRetry()
    }, [])

    async function fetchPosts() {
        try {
            const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN

            if (!token) {
                throw new Error("Missing Instagram access token")
            }

            if (!token.match(/^[A-Za-z0-9_\-.]+$/)) {
                throw new Error("Invalid Instagram access token format")
            }

            const baseUrl = "https://graph.instagram.com/DTDD"
            const params = new URLSearchParams({
                fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
                access_token: token,
            })

            const apiUrl = `${baseUrl}?${params.toString()}`

            console.log("Attempting to fetch Instagram posts with URL:", apiUrl)

            const response = await fetch(apiUrl, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
                signal: AbortSignal.timeout(10000),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(`API responded with status ${response.status}: ${errorData.error?.message || "Unknown error"}`)
            }

            const data = await response.json()

            if (!Array.isArray(data?.data)) {
                throw new Error("Invalid response format from Instagram API")
            }

            setPosts(data.data)
        } catch (err) {
            const baseUrl = "https://graph.instagram.com/me/media"
            console.error("Instagram API Error Details:", {
                error: err instanceof Error ? err.message : "Unknown error",
                type: err instanceof Error ? err.name : "Unknown type",
                stack: err instanceof Error ? err.stack : "No stack trace",
                url: baseUrl,
                responseStatus: err instanceof Error && "status" in err ? err.status : "No status",
                timestamp: new Date().toISOString(),
            })
            let errorMessage = "Unable to load Instagram posts. Please try again later."

            if (err instanceof Error) {
                if (err.message.includes("token")) {
                    errorMessage = "Instagram authentication failed."
                } else if (err.name === "TimeoutError") {
                    errorMessage = "Request timed out. Please check your internet connection."
                } else if (err.message.includes("ERR_ADDRESS_INVALID")) {
                    errorMessage = "Invalid API URL. Please check the Instagram API endpoint."
                }
            }

            setError(errorMessage)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const displayPosts = previewMode ? posts.slice(0, 3) : posts

    if (loading) {
        return (
            <IonCard className="h-[300px] sm:h-[400px]">
                <IonCardContent className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-4">
                        <IonSpinner name="crescent" />
                        <p>Loading Instagram feed...</p>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    if (error) {
        return (
            <IonCard className="h-[300px] sm:h-[400px]">
                <IonCardContent className="flex items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p>{error}</p>
                        <IonButton
                            href="https://www.instagram.com/msu_csclub/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit our Instagram page
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }

    return (
        <IonGrid>
            <IonRow>
                {displayPosts.map((post) => (
                    <IonCol size="12" sizeSm="6" sizeLg="4" key={post.id}>
                        <IonCard className="h-full">
                            <img
                                src={post.media_type === "VIDEO" ? post.thumbnail_url! : post.media_url}
                                alt={post.caption || "Instagram post"}
                                className="w-full h-48 object-cover"
                            />
                            {post.caption && (
                                <IonCardContent>
                                    <p className="text-sm line-clamp-3">{post.caption}</p>
                                    <p className="text-xs mt-2">{new Date(post.timestamp).toLocaleDateString()}</p>
                                </IonCardContent>
                            )}
                            <IonButton expand="block" href={post.permalink} target="_blank" rel="noopener noreferrer">
                                View on Instagram
                            </IonButton>
                        </IonCard>
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    )
}