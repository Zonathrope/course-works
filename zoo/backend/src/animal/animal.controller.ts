import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Animal } from 'src/schemas/animal.entity';
import { CreateAnimalDto } from './animal.dto';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal>{
    const animal = this.animalService.createAnimal(createAnimalDto)
    return animal
  }

  @Delete(':id')
  async deleteAnimal(@Param('id') id: string): Promise<Animal>{
    const deletedAnimal = this.animalService.deleteAnimal(id)
    return deletedAnimal
  }
}
