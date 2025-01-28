import { IonContent, IonHeader, IonTitle } from "@ionic/react"
import { InstagramFeed } from "@/components/InstagramFeed"

export default function InstagramSection() {
    return (
        <IonContent className="ion-padding">
            <IonHeader collapse="condense">
                <IonTitle size="large">Follow Our Journey</IonTitle>
            </IonHeader>
            <div className="flex justify-center">
                <InstagramFeed />
            </div>
        </IonContent>
    )
}