import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadMatMedController } from '../web/rest/pad-mat-med.controller';
import { PadMatMedRepository } from '../repository/pad-mat-med.repository';
import { PadMatMedService } from '../service/pad-mat-med.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadMatMedRepository])],
  controllers: [PadMatMedController],
  providers: [PadMatMedService],
  exports: [PadMatMedService]
})
export class PadMatMedModule {}
