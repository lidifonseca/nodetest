import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescPtaController } from '../web/rest/desc-pta.controller';
import { DescPtaRepository } from '../repository/desc-pta.repository';
import { DescPtaService } from '../service/desc-pta.service';

@Module({
  imports: [TypeOrmModule.forFeature([DescPtaRepository])],
  controllers: [DescPtaController],
  providers: [DescPtaService],
  exports: [DescPtaService]
})
export class DescPtaModule {}
