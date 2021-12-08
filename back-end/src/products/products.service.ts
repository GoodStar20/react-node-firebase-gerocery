import { HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { IProduct } from 'src/firebase/interfaces';

@Injectable()
export class ProductsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  getProducts(): Promise<IProduct[]> {
    return this.firebaseService.getProducts();
  }

  async buyProduct(
    userId: string,
    productId: string,
    quantity: number,
    productPrice: number,
  ): Promise<HttpStatus> {
    await this.firebaseService.buyProduct(productId, quantity);
    await this.firebaseService.updateUserBalance(
      -(productPrice * quantity),
      userId,
    );
    const product = await this.firebaseService.getProduct(productId);
    await this.firebaseService.addPurchase({
      name: product.name,
      quantity: quantity,
      price: product.price,
      userId,
    });
    return HttpStatus.OK;
  }
}
