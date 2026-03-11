import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AppointmentPageCard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Card className="w-2xl">
      <CardHeader>
        <CardTitle>Suas Informacoes</CardTitle>
        <CardDescription>
          Precisamos de seus dados para entrar em contato
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
