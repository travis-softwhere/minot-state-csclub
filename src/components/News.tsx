import { IonContent, IonHeader, IonTitle, IonButton } from "@ionic/react"
import { InstagramFeed } from "@/components/InstagramFeed"
import { isNativeApp } from "@/lib/utils"

export default function News() {
    return (
        <IonContent className="ion-padding">
            <IonHeader collapse="condense">
                <IonTitle size="large">Latest Updates</IonTitle>
            </IonHeader>
            <div className="flex flex-col items-center">
                <div className="w-full flex justify-center mb-8">
                    <InstagramFeed previewMode={true} />
                </div>
                <IonButton routerLink="/news" expand="block">
                    View All Posts
                </IonButton>
            </div>
        </IonContent>
    )
}