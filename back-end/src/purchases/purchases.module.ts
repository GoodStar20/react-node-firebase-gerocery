import { Module } from '@nestjs/common';

import { FirebaseModule } from 'src/firebase/firebase.module';

import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [FirebaseModule],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
