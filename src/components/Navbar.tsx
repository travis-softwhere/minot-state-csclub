"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/react"
import { menuOutline, closeOutline } from "ionicons/icons"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

const routes = [
    { href: "/", label: "Home" },
    { href: "/news", label: "News" },
    { href: "/tutorials", label: "Tutorials" },
    { href: "/games", label: "Games" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/members", label: "Members" },
]

export default function Navbar() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const MobileMenu = () => (
        <div
            className={`fixed inset-0 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}
        >
            <div className="flex flex-col h-full w-64 bg-zinc-900 shadow-lg">
                <div className="flex items-center justify-between p-4 border-b border-zinc-700">
                    <span className="text-xl font-bold text-white">Menu</span>
                    <button onClick={toggleMobileMenu} className="text-white">
                        <IonIcon icon={closeOutline} className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex flex-col mt-4">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800",
                                pathname === route.href ? "text-red-600" : "text-white",
                            )}
                            onClick={toggleMobileMenu}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex-1 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
        </div>
    )

    const WebNavbar = () => (
        <nav className="sticky top-0 z-50 w-full h-[10vh] bg-zinc-900 shadow-lg">
            <div className="container mx-auto h-full px-4">
                <div className="flex items-center justify-between h-full">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image src="/CS Club Mascot Logo.png" alt="CS Club Logo" width={150} height={10} />
                        <span className="text-xl font-bold text-white">MSU CS Club</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-red-600",
                                    pathname === route.href ? "text-red-600" : "text-white",
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="p-2 text-white rounded-md hover:bg-zinc-800">
                            <IonIcon icon={menuOutline} className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
            <MobileMenu />
        </nav>
    )

    const NativeNavbar = () => (
        <IonHeader className="ion-no-border">
            <IonToolbar color="dark">
                <div className="flex items-center">
                    <Image src="/cs-club-logo.png" alt="CS Club Logo" width={30} height={30} className="mr-2" />
                    <IonTitle>MSU CS Club</IonTitle>
                </div>
                <IonButtons slot="start">
                    <IonButton onClick={toggleMobileMenu}>
                        <IonIcon icon={menuOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <MobileMenu />
        </IonHeader>
    )

    return <NoSSR>{isNativeApp() ? <NativeNavbar /> : <WebNavbar />}</NoSSR>
}