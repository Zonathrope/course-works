import { Body, Controller, Post } from '@nestjs/common';
import { Order } from 'src/schemas/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() orderDto: any): Promise<Order> {
    return this.orderService.create(orderDto);
  }
}
