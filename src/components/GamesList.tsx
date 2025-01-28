"use client"

import Image from "next/image"
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonThumbnail, IonButton } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"

type Game = {
    id: number
    title: string
    description: string
    image: string
}

const games: Game[] = [
    {
        id: 1,
        title: "Tic Tac Toe",
        description: "A classic game of Tic Tac Toe. Play against the computer or a friend!",
        image: "/tic-tac-toe.png",
    },
    {
        id: 2,
        title: "Minesweeper",
        description: "Find all the mines without triggering any of them!",
        image: "/minesweeper.png",
    },
    {
        id: 3,
        title: "Snake Game",
        description: "Control the snake and eat the apples to grow longer.",
        image: "/snake.png",
    },
]

export default function GamesList() {
    const GameCard = ({ game }: { game: Game }) => (
        <IonCard className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image src={game.image || "/placeholder.svg"} alt={game.title} layout="fill" objectFit="cover" />
            </div>
            <IonCardHeader>
                <IonCardTitle className="text-2xl font-bold text-red-600">{game.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p className="text-gray-700 mb-4">{game.description}</p>
                <IonButton expand="block" color="primary">
                    Play Now
                </IonButton>
            </IonCardContent>
        </IonCard>
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    )
}