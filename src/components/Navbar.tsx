"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/react"
import { menuOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

const routes = [
    { href: "/", label: "Home" },
    { href: "/news", label: "News" },
    { href: "/tutorials", label: "Tutorials" },
    { href: "/games", label: "Games" },
    { href: "/members", label: "Members" },
]

export default function Navbar() {
    const pathname = usePathname()

    const WebNavbar = () => (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3">
                        <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                            MSU CS Club
                        </span>
                    </Link>
                    <div className="hidden md:flex space-x-8">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-red-600",
                                    pathname === route.href ? "text-red-600" : "text-gray-600 hover:text-red-600",
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button className="p-2 rounded-md hover:bg-gray-100">
                            <IonIcon icon={menuOutline} className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )

    const NativeNavbar = () => (
        <IonHeader className="ion-no-border">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton>
                        <IonIcon icon={menuOutline} />
                    </IonButton>
                </IonButtons>
                <IonTitle>MSU CS Club</IonTitle>
            </IonToolbar>
        </IonHeader>
    )

    return <NoSSR>{isNativeApp() ? <NativeNavbar /> : <WebNavbar />}</NoSSR>
}