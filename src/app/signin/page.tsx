"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { IonContent, IonPage, IonItem, IonLabel, IonInput, IonButton, IonText } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })

            if (response.ok) {
                router.push("/")
            } else {
                const data = await response.json()
                setError(data.message || "Invalid login credentials.")
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.")
        }
    }

    const WebLogin = () => (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-4xl font-bold text-center text-red-600">Login</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Log In
                </button>
                <div className="text-center mt-4">
                    <p>
                        Don't have an account?{" "}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )

    const NativeLogin = () => (
        <IonPage>
            <IonContent className="ion-padding">
                <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput
                            value={username}
                            onIonChange={(e) => setUsername(e.detail.value!)}
                            placeholder="Enter your username"
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                            type="password"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)}
                            placeholder="Enter your password"
                            required
                        />
                    </IonItem>
                    {error && (
                        <IonText color="danger" className="ion-text-center">
                            <p>{error}</p>
                        </IonText>
                    )}
                    <IonButton expand="block" type="submit" className="mt-6">
                        Log In
                    </IonButton>
                    {/*
                    <div className="ion-text-center mt-4">
                        <p>
                            Don't have an account?{" "}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                    */}
                </form>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeLogin /> : <WebLogin />}</NoSSR>
}