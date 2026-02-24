export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
  active: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  services: string[];
  eventDate: string;
  message: string;
}
