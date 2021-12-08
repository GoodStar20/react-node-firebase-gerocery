export interface IProduct {
  id: string;
  name: string;
  in_stock: number;
  price: number;
}

export interface IUserInfo {
  id?: string;
  balance?: number;
  email?: string;
  isMember?: boolean;
  name?: string;
  userId?: string;
}

export interface IPurchase {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  userId: string;
}
