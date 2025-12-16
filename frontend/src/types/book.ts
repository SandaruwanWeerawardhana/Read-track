export interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  description?: string;
}
