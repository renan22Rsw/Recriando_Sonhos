export interface CreateProductProps {
  title: string;
  description: string;
  image: string;
  price: number;
  available: boolean;
  includedItems: string[];
}

export interface UpdateProductProps {
  title?: string;
  description?: string;
  image?: string;
  price?: number;
  available?: boolean;
  includedItems?: string[];
}
