import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZoneService {
  constructor(@InjectModel(Zone.name) private readonly zoneModel: Model<Zone>){}

  async create(createZoneDto: CreateZoneDto): Promise<Zone> {
    const zone = new this.zoneModel({
      ...createZoneDto
    })
    return zone.save();
  }

  async findAll(): Promise<Zone[] | []> {
    const zones = this.zoneModel.find().exec()
    return zones;
  }

  async findOne(id: string): Promise<Zone | undefined> {
    const zone = this.zoneModel.findById(id)
    return zone;
  }

  async findByName(name: string): Promise<Zone[] | []> {
    const zones = this.zoneModel.find({ type: name })
    return zones
  }

  async update(id: string, updateZoneDto: UpdateZoneDto): Promise<Zone | undefined> {
    const zone = this.zoneModel.findByIdAndUpdate(id, { ...updateZoneDto })
    return zone;
  }

  async remove(id: string): Promise<Zone | undefined> {
    const zone = this.zoneModel.findByIdAndDelete(id)
    return zone;
  }
}
