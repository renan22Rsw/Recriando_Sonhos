import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { ProfileEditButton } from "./profile-edit-button";
import { ProfileCancelButton } from "./profile-cancel-button";
import { ProfileDeleteButton } from "./profile-delete-button";
import { Status } from "@/types/appointments";
import { statusFormatted } from "@/utils/status-formtted";
import { dateFormatted } from "@/utils/date-formatted";

interface ProfileAppointmentsProps {
  id: string;
  title: string;
  status: Status;
  date: string;
  price: string;

  email: string;
  name: string;
}

export const ProfileAppointments = ({
  id,
  title,
  status,
  date,
  price,

  email,
  name,
}: ProfileAppointmentsProps) => {
  return (
    <div className="py-8">
      <div className="rounded-2xl border-2 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <Badge
            className={cn(
              "font-bold",
              status === Status.CONFIRMED &&
                "border-green-300 bg-green-100 text-green-600",
              status === Status.PENDING &&
                "border-yellow-300 bg-yellow-100 text-yellow-600",

              status === Status.CANCELED &&
                "border-purple-300 bg-purple-100 text-purple-600",

              status === Status.REJECTED &&
                "border-red-300 bg-red-100 text-red-600",
            )}
          >
            {statusFormatted(status)}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">Anivesário</p>

        <div className="py-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {dateFormatted(date)}
            </span>
            <span className="text-xl font-bold text-[#E85555]">{price}</span>
          </div>
        </div>
        <div className="space-y-4 py-2">
          <div className="h-px w-full bg-gray-200"></div>

          <div className="flex items-center gap-2">
            <ProfileEditButton id={id} name={name} email={email} date={date} />
            <ProfileCancelButton id={id} />
            <ProfileDeleteButton id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
