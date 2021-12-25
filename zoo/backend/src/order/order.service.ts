import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Mailer } from 'src/lib/mail/mail.service'
import { Order } from 'src/schemas/order.entity'
import { Zoo } from 'src/schemas/zoo.entity'

@Injectable()
export class OrderService {
  constructor(
    private readonly mailer: Mailer,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Zoo.name) private readonly zooModel: Model<Zoo>
  ) {}

  async create(data) {
    const letter = new this.orderModel({
      ...data
    })
    await this.zooModel.findByIdAndUpdate(data.zoo_id, { $inc: { rating: 1 } })
    return {
      ...letter.save(),
      sended: await this.mailer.sendMail(data.email, data.name, data.order_number)
    }
  }
}
