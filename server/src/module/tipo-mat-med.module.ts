import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMatMedController } from '../web/rest/tipo-mat-med.controller';
import { TipoMatMedRepository } from '../repository/tipo-mat-med.repository';
import { TipoMatMedService } from '../service/tipo-mat-med.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoMatMedRepository])],
  controllers: [TipoMatMedController],
  providers: [TipoMatMedService],
  exports: [TipoMatMedService]
})
export class TipoMatMedModule {}
