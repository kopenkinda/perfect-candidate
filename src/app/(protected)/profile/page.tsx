import { PrivacySettings } from "./privacy/privacy-settings";

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8"></div>
      <PrivacySettings className="col-span-4" />
    </div>
  );
}
