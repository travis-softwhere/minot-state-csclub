"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { IonContent, IonPage, IonItem, IonLabel, IonInput, IonButton, IonText, IonList } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [yearOfStudy, setYearOfStudy] = useState("")
    const [major, setMajor] = useState("")
    const [profilePic, setProfilePic] = useState<string | null>(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement> | CustomEvent) => {
        const file =
            "target" in e && e.target instanceof HTMLInputElement && e.target.files
                ? e.target.files[0]
                : (e as CustomEvent).detail.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePic(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    fullName,
                    yearOfStudy,
                    major,
                    profilePic,
                    userType: "Member",
                }),
            })

            if (response.ok) {
                setSuccess(true)
                setTimeout(() => router.push("/login"), 2000)
            } else {
                const data = await response.json()
                setError(data.message || "Failed to register. Please try again.")
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.")
        }
    }

    const WebRegister = () => (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-4xl font-bold text-center text-red-600">Register</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="Your full name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">School Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="Enter your email"
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
                        placeholder="Create a password"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Year of Study</label>
                    <input
                        type="text"
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="e.g., Freshman, Sophomore"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Major</label>
                    <input
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                        placeholder="Your major (e.g., Computer Science)"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                    />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">Registration successful! Redirecting...</p>}
                <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Register
                </button>
            </form>
        </div>
    )

    const NativeRegister = () => (
        <IonPage>
            <IonContent className="ion-padding">
                <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <IonList>
                        <IonItem>
                            <IonLabel position="floating">Full Name</IonLabel>
                            <IonInput
                                value={fullName}
                                onIonChange={(e) => setFullName(e.detail.value!)}
                                placeholder="Your full name"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">School Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                placeholder="Enter your email"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                type="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                                placeholder="Create a password"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Year of Study</IonLabel>
                            <IonInput
                                value={yearOfStudy}
                                onIonChange={(e) => setYearOfStudy(e.detail.value!)}
                                placeholder="e.g., Freshman, Sophomore"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Major</IonLabel>
                            <IonInput
                                value={major}
                                onIonChange={(e) => setMajor(e.detail.value!)}
                                placeholder="Your major (e.g., Computer Science)"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Profile Picture (Optional)</IonLabel>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProfilePicChange(e)}
                                style={{ marginTop: "8px" }}
                            />
                        </IonItem>
                    </IonList>
                    {error && (
                        <IonText color="danger" className="ion-text-center">
                            <p>{error}</p>
                        </IonText>
                    )}
                    {success && (
                        <IonText color="success" className="ion-text-center">
                            <p>Registration successful! Redirecting...</p>
                        </IonText>
                    )}
                    <IonButton expand="block" type="submit" className="mt-6">
                        Register
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )

    return <NoSSR>{isNativeApp() ? <NativeRegister /> : <WebRegister />}</NoSSR>
}