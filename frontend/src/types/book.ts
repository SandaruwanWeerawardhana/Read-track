export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  description?: string;
}
