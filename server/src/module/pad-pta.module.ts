import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadPtaController } from '../web/rest/pad-pta.controller';
import { PadPtaRepository } from '../repository/pad-pta.repository';
import { PadPtaService } from '../service/pad-pta.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadPtaRepository])],
  controllers: [PadPtaController],
  providers: [PadPtaService],
  exports: [PadPtaService]
})
export class PadPtaModule {}
