import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FcGoogle } from "react-icons/fc";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  googleButtonText: string;
}

export const AuthCard = ({
  title,
  description,
  children,
  googleButtonText,
}: AuthCardProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Button variant="outline" className="font-semibold">
          <FcGoogle /> {googleButtonText}
        </Button>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};
