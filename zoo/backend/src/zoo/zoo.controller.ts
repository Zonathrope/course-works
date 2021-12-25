import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ZooService } from './zoo.service';
import { CreateZooDto } from './dto/create-zoo.dto';
import { UpdateZooDto } from './dto/update-zoo.dto';
import { Zoo } from './entities/zoo.entity';

@Controller('zoo')
export class ZooController {
  constructor(private readonly zooService: ZooService) {}

  @Post()
  async create(@Body() createZooDto: CreateZooDto): Promise<Zoo> {
    return this.zooService.create(createZooDto);
  }

  @Get()
  async findAll(): Promise<Zoo> {
    return this.zooService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Zoo> {
    return this.zooService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateZooDto: UpdateZooDto): Promise<Zoo> {
    return this.zooService.update(id, updateZooDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Zoo | undefined> {
    return this.zooService.remove(id);
  }
}
