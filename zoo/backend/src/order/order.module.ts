import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { Mailer } from 'src/lib/mail/mail.service'
import { MailerModule } from 'src/lib/mail/mail.module'
import { Order, OrderSchema } from 'src/schemas/order.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { Zoo, ZooSchema } from 'src/schemas/zoo.entity'

@Module({
  imports: [
    MailerModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Zoo.name, schema: ZooSchema }])
  ],
  controllers: [OrderController],
  providers: [OrderService, Mailer]
})
export class OrderModule {}
