import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateZooDto } from './dto/create-zoo.dto';
import { UpdateZooDto } from './dto/update-zoo.dto';
import { Zoo } from './entities/zoo.entity';

@Injectable()
export class ZooService {
  constructor(@InjectModel(Zoo.name) private readonly zooModel: Model<Zoo>){}

  async create(createZooDto: CreateZooDto): Promise<Zoo> {
    const zoo = new this.zooModel({
      ...createZooDto,
      rating: 0
    })
    return zoo.save();
  }

  async findAll(): Promise<Zoo[]> {
    return this.zooModel.find().populate('location_id').exec();
  }

  async findOne(id: string): Promise<Zoo> {
    const zoo = this.zooModel.findById(id)
    return zoo;
  }

  async update(id: string, updateZooDto: UpdateZooDto): Promise<Zoo> {
    const zoo = this.zooModel.findByIdAndUpdate(id, { ...updateZooDto})
    return zoo;
  }

  async remove(id: string): Promise<Zoo | undefined> {
    const zoo = this.zooModel.findByIdAndDelete(id)
    return zoo;
  }
}
