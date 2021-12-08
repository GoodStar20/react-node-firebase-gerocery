import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
  addDoc,
  documentId,
} from 'firebase/firestore';

import { IProduct, IPurchase, IUserInfo } from './interfaces';

@Injectable()
export class FirebaseService implements OnModuleInit {
  app;
  db;

  async getProducts(): Promise<IProduct[]> {
    const productsCol = collection(this.db, 'products');
    const productsSnapshot = await getDocs(productsCol);
    const productsList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return productsList as IProduct[];
  }

  async getProduct(productId: string): Promise<IProduct> {
    const productsRef = collection(this.db, 'products');
    const q = query(productsRef, where(documentId(), '==', productId));
    const querySnapshot = await getDocs(q);
    const productsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IProduct[];
    if (productsList.length > 0) {
      return productsList[0];
    } else {
      throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserInfo(userId: string): Promise<IUserInfo> {
    const usersInfoCol = collection(this.db, 'users_info');
    const usersInfoSnapshot = await getDocs(usersInfoCol);
    const usersInfoList = usersInfoSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IUserInfo[];
    const userInfo = usersInfoList.find(
      (userInfo) => userInfo.userId === userId,
    );
    if (userInfo) {
      return userInfo;
    } else {
      throw new HttpException('User Info not found', HttpStatus.BAD_REQUEST);
    }
  }

  async buyProduct(productId: string, quantity: number): Promise<HttpStatus> {
    const products = await this.getProducts();
    const product = products.find((prod) => prod.id === productId);
    const productRef = doc(this.db, 'products', productId);
    if (product.in_stock - quantity < 0) {
      throw new HttpException(
        'The product is out of stock',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await updateDoc(productRef, {
        in_stock: product.in_stock - quantity,
      });
    }
    return HttpStatus.OK;
  }

  async updateUserBalance(
    balanceDiff: number,
    userId: string,
  ): Promise<HttpStatus> {
    const userInfo = await this.getUserInfo(userId);
    const userInfoRef = doc(this.db, 'users_info', userInfo.id);
    await updateDoc(userInfoRef, {
      balance: userInfo.balance + balanceDiff,
    });
    return HttpStatus.OK;
  }

  async addNewUserInfo(userId: string, email: string): Promise<HttpStatus> {
    await addDoc(collection(this.db, 'users_info'), {
      email,
      userId,
      name: '',
      balance: 500,
      isMember: true,
    });
    return HttpStatus.OK;
  }

  async getPurchases(userId: string): Promise<IPurchase[]> {
    const purchasesRef = collection(this.db, 'purchases');
    const q = query(purchasesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const purchasesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IPurchase[];
    return purchasesList;
  }

  async addPurchase(purchaseBody: IPurchase): Promise<HttpStatus> {
    await addDoc(collection(this.db, 'purchases'), purchaseBody);
    return HttpStatus.OK;
  }

  onModuleInit(): void {
    this.app = initializeApp({
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    });
    this.db = getFirestore(this.app);
  }
}
