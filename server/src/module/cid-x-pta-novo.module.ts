import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidXPtaNovoController } from '../web/rest/cid-x-pta-novo.controller';
import { CidXPtaNovoRepository } from '../repository/cid-x-pta-novo.repository';
import { CidXPtaNovoService } from '../service/cid-x-pta-novo.service';

@Module({
  imports: [TypeOrmModule.forFeature([CidXPtaNovoRepository])],
  controllers: [CidXPtaNovoController],
  providers: [CidXPtaNovoService],
  exports: [CidXPtaNovoService]
})
export class CidXPtaNovoModule {}
