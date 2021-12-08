import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { IPurchase } from 'src/firebase/interfaces';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get(':userId')
  getPurchases(@Param('userId') userId: string): Promise<IPurchase[]> {
    return this.purchasesService.getPurchases(userId);
  }

  @Post()
  addPurchase(@Body() body: IPurchase) {
    return this.purchasesService.addPurchase(body);
  }
}
