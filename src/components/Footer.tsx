"use client"

import { IonFooter, IonToolbar, IonTitle } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

export default function Footer() {
    const WebFooter = () => (
        <footer className="w-full border-t bg-white mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between py-8">
                    <p className="text-sm text-gray-600 mb-4 md:mb-0">
                        © {new Date().getFullYear()} MSU CS Club. All rights reserved.
                    </p>
                    <nav className="flex items-center gap-8">
                        <a
                            href="https://github.com/MSUCSClub"
                            className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                        <a href="/about" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                            About
                        </a>
                        <a href="/contact" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                            Contact
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    )

    const NativeFooter = () => (
        <IonFooter className="ion-no-border">
            <IonToolbar>
                <IonTitle size="small" className="text-center">
                    © {new Date().getFullYear()} MSU CS Club
                </IonTitle>
            </IonToolbar>
        </IonFooter>
    )

    return <NoSSR>{isNativeApp() ? <NativeFooter /> : <WebFooter />}</NoSSR>
}