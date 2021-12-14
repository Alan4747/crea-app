export interface Products {
  product_id: number;
  product_name: string;
  product_image: string;
  description: string;
  comments: Comments[];
  price: any;
  date: number;
  rating: Rating;
}

export interface Rating {
  rate: any;
  count: number;
}

export interface Comments {
  product_id:number;
  comment_id: number;
  rating: number;
  comment: string;
  userName:string;
}
