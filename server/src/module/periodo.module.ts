import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoController } from '../web/rest/periodo.controller';
import { PeriodoRepository } from '../repository/periodo.repository';
import { PeriodoService } from '../service/periodo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodoRepository])],
  controllers: [PeriodoController],
  providers: [PeriodoService],
  exports: [PeriodoService]
})
export class PeriodoModule {}
