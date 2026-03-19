import { getSession } from "@/lib/api/get-session";
import { ProfilePageContainer } from "./_components/profile-page-container";
import { ProfilePageHeader } from "./_components/profile-page-header";
import { ProfilePageSection1 } from "./_components/profile-page-section1-";
import { ProfilePageSection2 } from "./_components/profile-page-section2";
import { getUserAppointments } from "@/lib/api/get-user-appointments";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();
  const appointments = await getUserAppointments();

  if (!session) {
    redirect("/login");
  }

  if (session?.user.role !== "user") {
    redirect("/");
  }

  return (
    <ProfilePageContainer>
      <ProfilePageHeader
        name={session?.user.name as string}
        email={session?.user.email as string}
      />
      <ProfilePageSection1 appointments={appointments} />
      <ProfilePageSection2 appointments={appointments} />
    </ProfilePageContainer>
  );
};

export default ProfilePage;
