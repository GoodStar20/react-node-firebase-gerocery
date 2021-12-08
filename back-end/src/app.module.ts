import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UsersInfoModule } from './users-info/users-info.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [ProductsModule, FirebaseModule, UsersInfoModule, PurchasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
