import { ProfilePageContainer } from "./_components/profile-page-container";
import { ProfilePageHeader } from "./_components/profile-page-header";
import { ProfilePageSection1 } from "./_components/profile-page-section1-";
import { ProfilePageSection2 } from "./_components/profile-page-section2";

const ProfilePage = () => {
  return (
    <ProfilePageContainer>
      <ProfilePageHeader />
      <ProfilePageSection1 />
      <ProfilePageSection2 />
    </ProfilePageContainer>
  );
};

export default ProfilePage;
