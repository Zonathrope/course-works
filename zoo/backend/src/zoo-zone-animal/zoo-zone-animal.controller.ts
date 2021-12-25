import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZooZoneAnimalService } from './zoo-zone-animal.service';
import { CreateZooZoneAnimalDto } from './dto/create-zoo-zone-animal.dto';

@Controller('zoo-zone-animal')
export class ZooZoneAnimalController {
  constructor(private readonly zooZoneAnimalService: ZooZoneAnimalService) {}

  @Post()
  create(@Body() createZooZoneAnimalDto: CreateZooZoneAnimalDto) {
    return this.zooZoneAnimalService.create(createZooZoneAnimalDto);
  }

  @Get(':id')
  getAllFromOne(@Param('id') id: string){
    return this.zooZoneAnimalService.getAllInfoFromZooID(id)
  }

  @Get()
  findAll() {
    return this.zooZoneAnimalService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zooZoneAnimalService.remove(id);
  }

  @Delete('/animal/:id')
  async deleteAnimal(@Param('id') id: string) {
    return this.zooZoneAnimalService.deleteAnimal(id)
  }

  @Delete('/zone/:id')
  async deleteZone(@Param('id') id: string) {
    return this.zooZoneAnimalService.deleteZone(id)
  }

  @Delete('/zoo/:id')
  async deleteZoo(@Param('id') id: string) {
    return this.zooZoneAnimalService.deleteZoo(id)
  }
}
