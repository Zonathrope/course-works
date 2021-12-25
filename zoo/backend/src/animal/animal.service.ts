import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Animal } from 'src/schemas/animal.entity'

@Injectable()
export class AnimalService {
  constructor(@InjectModel(Animal.name) private readonly animalModel: Model<Animal>) {}

  async createAnimal(createAnimalDto: any): Promise<Animal>{
    const animal = new this.animalModel({
      name: createAnimalDto.name || 'unknown',
      specie: createAnimalDto.specie || 'unknown',
      year_old: createAnimalDto.year_old || 'unknown'
    })
    return animal.save()
  }

  async deleteAnimal(id: string): Promise<Animal>{
    const animal = this.animalModel.findByIdAndDelete(id)
    return animal
  }
}
