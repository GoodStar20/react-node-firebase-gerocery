import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { IProduct } from 'src/firebase/interfaces';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<IProduct[]> {
    return this.productsService.getProducts();
  }

  @Post()
  buyProduct(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
    @Body('productPrice') productPrice: number,
  ): Promise<HttpStatus> {
    return this.productsService.buyProduct(
      userId,
      productId,
      quantity,
      productPrice,
    );
  }
}
