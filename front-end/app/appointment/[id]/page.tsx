import { AppointmentPageCard } from "./_components/appointment-page-card";
import { AppointmentPageContainer } from "./_components/appointment-page-container";
import { AppointmentPageForm } from "./_components/appointment-page-form";

const AppointmentPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <AppointmentPageContainer>
      <AppointmentPageCard>
        <AppointmentPageForm productId={id} />
      </AppointmentPageCard>
    </AppointmentPageContainer>
  );
};

export default AppointmentPage;
