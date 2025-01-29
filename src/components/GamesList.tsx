"use client"

import Link from "next/link"
import Image from "next/image"
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonGrid, IonRow, IonCol } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

type Game = {
    id: string
    title: string
    description: string
    image: string
}

const games: Game[] = [
    {
        id: "tic-tac-toe",
        title: "Tic Tac Toe",
        description: "A classic game of Tic Tac Toe. Play against a friend!",
        image: "/tic-tac-toe.png",
    },
    {
        id: "memory-match",
        title: "Memory Match",
        description: "Test your memory by matching pairs of cards.",
        image: "/memory-match.png",
    },
    {
        id: "minesweeper",
        title: "Minesweeper",
        description: "Clear the minefield without triggering any explosions!",
        image: "/minesweeper.png",
    },
]

export default function GamesList() {
    const NativeGameCard = ({ game }: { game: Game }) => (
        <IonCard className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image src={game.image || "/placeholder.svg"} alt={game.title} layout="fill" objectFit="cover" />
            </div>
            <IonCardHeader>
                <IonCardTitle className="text-2xl font-bold text-red-600">{game.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p className="text-gray-700 mb-4">{game.description}</p>
                <Link href={`/games/${game.id}`} passHref>
                    <IonButton expand="block" color="primary">
                        Play Now
                    </IonButton>
                </Link>
            </IonCardContent>
        </IonCard>
    )

    const WebGameCard = ({ game }: { game: Game }) => (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative h-48 w-full">
                <Image src={game.image || "/placeholder.svg"} alt={game.title} layout="fill" objectFit="fit" />
            </div>
            <div className="p-4">
                <h3 className="text-2xl font-bold text-red-600">{game.title}</h3>
                <p className="mt-2 text-gray-700 mb-4">{game.description}</p>
                <Link href={`/games/${game.id}`} passHref>
                    Play Now
                </Link>
            </div>
        </div>
    )

    return (
        <NoSSR>
            {isNativeApp() ? (
                <IonGrid>
                    <IonRow>
                        {games.map((game) => (
                            <IonCol key={game.id} size="12" sizeMd="6" sizeLg="4">
                                <NativeGameCard game={game} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => (
                        <WebGameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </NoSSR>
    )
}