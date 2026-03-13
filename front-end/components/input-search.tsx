import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface InputSearch {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const InputSearch = ({ search, setSearch }: InputSearch) => {
  return (
    <div className="relative py-4">
      <Search className="absolute top-1/2 left-2 -translate-y-1/2" size={16} />
      <Input
        placeholder="Buscar Produtos"
        className="h-11 w-full rounded-2xl px-8 selection:bg-[#E64343] selection:text-white placeholder:font-semibold focus-visible:ring-[#E64343] focus-visible:ring-offset-0 md:w-100"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
