import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidPtaController } from '../web/rest/cid-pta.controller';
import { CidPtaRepository } from '../repository/cid-pta.repository';
import { CidPtaService } from '../service/cid-pta.service';

@Module({
  imports: [TypeOrmModule.forFeature([CidPtaRepository])],
  controllers: [CidPtaController],
  providers: [CidPtaService],
  exports: [CidPtaService]
})
export class CidPtaModule {}
