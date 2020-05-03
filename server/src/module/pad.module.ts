import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadController } from '../web/rest/pad.controller';
import { PadRepository } from '../repository/pad.repository';
import { PadService } from '../service/pad.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadRepository])],
  controllers: [PadController],
  providers: [PadService],
  exports: [PadService]
})
export class PadModule {}
