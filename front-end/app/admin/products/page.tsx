import { DashboardPageContainer } from "../dashboard/_components/dashboard-page-container";
import { AdminProductsPageHeader } from "./_components/admin-products-page-header";
import { AdminProductsPageMain } from "./_components/admin-products-page-main";

const AdminProductsPage = () => {
  return (
    <DashboardPageContainer>
      <AdminProductsPageHeader />
      <AdminProductsPageMain />
    </DashboardPageContainer>
  );
};

export default AdminProductsPage;
