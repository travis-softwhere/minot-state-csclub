import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/typography.css';

import MembersList from "@/components/MembersList";

export default function MembersPage() {
    return (
        <div className="p-8">
            <MembersList />
        </div>
    );
}