import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface HeaderProps {
  title: string;
  colorText: string;
  description: string;
  icon: LucideIcon;
  size: number;
  iconLabel: string;
}

export const Header = ({
  title,
  colorText,
  description,
  icon: Icon,
  size = 16,
  iconLabel,
}: HeaderProps) => {
  {
    /* All the text gonna be replaced, it's just a model*/
  }

  return (
    <header className="h-145 bg-[#F9F8F7] px-4 lg:h-120">
      <div className="flex flex-col items-center space-y-4 pt-20">
        <Badge className="gap-2 rounded-3xl bg-[#F6E5E4] px-3 py-2 text-lg font-semibold text-[#E85555]">
          <Icon size={size} />
          {iconLabel}
        </Badge>
        <h1 className="max-w-160 text-center text-3xl font-bold lg:text-5xl 2xl:text-6xl">
          {title} <span className="text-[#E85555]">{colorText}</span>
        </h1>
        <p className="text-foreground/60 max-w-190 text-center text-xl md:text-2xl">
          {description}
        </p>
      </div>
    </header>
  );
};
