"use client"

import Image from "next/image"
import Link from "next/link"
import { IonContent, IonPage, IonList, IonItem, IonLabel } from "@ionic/react"
import { isNativeApp } from "@/lib/utils"
import NoSSR from "@/components/NoSSR"

const sections = [
  {
    title: "Tutorials",
    description: "Access our collection of programming tutorials and resources.",
    href: "/tutorials",
  },
  {
    title: "Games",
    description: "Play educational games and improve your coding skills.",
    href: "/games",
  },
  {
    title: "Members",
    description: "Meet our community of passionate developers and learners.",
    href: "/members",
  },
  {
    title: "News",
    description: "Stay updated with the latest CS Club events and announcements.",
    href: "/news",
  },
]

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-blue-500 text-white p-10">
//       <h1 className="text-3xl font-bold">Tailwind Debug Test</h1>
//       <p className="text-lg">If this text is white with a blue background, Tailwind is working.</p>
//     </div>
//   );
// }

export default function Home() {
  const WebContent = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-12">
        <div className="w-full max-w-[600px] mb-8">
          <Image
            src="/CSimage.jpg"
            alt="CS Club"
            width={600}
            height={400}
            priority
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">MSU CS Club</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome to the Minot State University Computer Science Club</p>
      </div>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {sections.map((section) => (
          <Link key={section.title} href={section.href}>
            <div className="group cursor-pointer">
              <h2 className="text-2xl font-bold text-blue-600 group-hover:underline mb-2">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )

  const NativeContent = () => (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/CSimage.jpg"
            alt="CS Club"
            width={300}
            height={200}
            priority
            className="w-full max-w-[300px] h-auto mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">MSU CS Club</h1>
          <p className="text-center text-gray-600 mb-6">Welcome to the Minot State University Computer Science Club</p>
        </div>

        <IonList>
          {sections.map((section) => (
            <IonItem key={section.title} routerLink={section.href} detail={true}>
              <IonLabel>
                <h2 className="font-semibold">{section.title}</h2>
                <p className="text-sm text-gray-600">{section.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )

  return <NoSSR>{isNativeApp() ? <NativeContent /> : <WebContent />}</NoSSR>
}