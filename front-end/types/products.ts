export interface Products {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  includedItems: IncludeItems[];
}

export interface IncludeItems {
  id: number;
  text: string;
}
