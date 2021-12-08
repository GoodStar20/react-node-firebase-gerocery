import { HttpStatus, Injectable } from '@nestjs/common';

import { FirebaseService } from 'src/firebase/firebase.service';
import { IPurchase } from 'src/firebase/interfaces';

@Injectable()
export class PurchasesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  getPurchases(userId: string): Promise<IPurchase[]> {
    return this.firebaseService.getPurchases(userId);
  }

  addPurchase(purchaseBody: IPurchase): Promise<HttpStatus> {
    return this.firebaseService.addPurchase(purchaseBody);
  }
}
