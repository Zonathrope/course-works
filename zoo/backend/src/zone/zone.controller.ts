import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  async create(@Body() createZoneDto: CreateZoneDto): Promise<Zone> {
    return this.zoneService.create(createZoneDto);
  }

  @Get()
  async findAll(): Promise<Zone[] | []> {
    return this.zoneService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Zone | undefined> {
    return this.zoneService.findOne(id);
  }

  @Get('/name/:name')
  async FindAllByName(@Param('name') name: string){
    return this.zoneService.findByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto): Promise<Zone | undefined> {
    return this.zoneService.update(id, updateZoneDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Zone | undefined> {
    return this.zoneService.remove(id);
  }
}
