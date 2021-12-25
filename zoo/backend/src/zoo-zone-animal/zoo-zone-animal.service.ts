import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Converter } from 'src/lib/helpers/convert'
import { CreateZooZoneAnimalDto } from './dto/create-zoo-zone-animal.dto'
import { ZooZoneAnimal } from './entities/zoo-zone-animal.entity'

@Injectable()
export class ZooZoneAnimalService {
  constructor(
    @InjectModel(ZooZoneAnimal.name)
    private readonly zooZoneAminalModel: Model<ZooZoneAnimal>,
    private readonly convert: Converter
  ) {}

  async create(
    createZooZoneAnimalDto: CreateZooZoneAnimalDto
  ): Promise<ZooZoneAnimal> {
    const zooZoneAnimal = new this.zooZoneAminalModel({
      ...createZooZoneAnimalDto
    })
    return zooZoneAnimal.save()
  }

  async findAll(): Promise<any> {
    const fullArray = await this.zooZoneAminalModel
      .find()
      .populate({
        path: 'zoo_id',
        populate: {
          path: 'location_id',
          model: 'Location'
        }
      })
      .populate('animal_id')
      .populate('zone_id')
      .exec()
    const converted = await this.convert.combiner(fullArray)
    return converted
  }

  async getAllInfoFromZooID(id: string): Promise<any> {
    const info = await this.zooZoneAminalModel
      .find({ zoo_id: id })
      .populate('zone_id')
      .populate({
        path: 'zoo_id',
        populate: {
          path: 'location_id',
          model: 'Location'
        }
      })
      .populate('animal_id')
      .exec()
    const converted = await this.convert.combiner(info)

    return converted
  }

  async remove(id: string): Promise<ZooZoneAnimal | undefined> {
    return `This action removes a #${id} zooZoneAnimal`
  }

  async deleteAnimal(id: string): Promise<ZooZoneAnimal | undefined> {
    return this.zooZoneAminalModel.findOneAndDelete({ animal_id: id })
  }

  async deleteZone(id: string): Promise<ZooZoneAnimal | undefined> {
    return this.zooZoneAminalModel.deleteMany({ zone_id: id })
  }

  async deleteZoo(id: string): Promise<ZooZoneAnimal | undefined> {
    return this.zooZoneAminalModel.deleteMany({ zoo_id: id })
  }
}
