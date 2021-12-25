import { PartialType } from '@nestjs/mapped-types';
import { CreateZooZoneAnimalDto } from './create-zoo-zone-animal.dto';

export class UpdateZooZoneAnimalDto extends PartialType(CreateZooZoneAnimalDto) {}
