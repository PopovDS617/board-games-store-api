import { Document } from 'mongoose';

export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  resetToken: string;
  resetTokenExpiration: Date;

  token: string;
  cart: {
    items: [
      {
        productId: string;
        quantity: number;
      }
    ];
  };
}
