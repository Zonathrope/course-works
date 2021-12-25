import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from 'src/schemas/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(@InjectModel(Location.name) private readonly locationModel: Model<Location>){}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = new this.locationModel({
      ...createLocationDto
    })
    return location.save();
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findOne(id: string): Promise<Location | undefined> {
    return this.locationModel.findById(id);
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    return this.locationModel.findByIdAndUpdate(id, { ...updateLocationDto });
  }

  async remove(id: string): Promise<Location | undefined> {
    return this.locationModel.findByIdAndDelete(id);
  }
}
