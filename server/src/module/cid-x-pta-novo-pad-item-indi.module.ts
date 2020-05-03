import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidXPtaNovoPadItemIndiController } from '../web/rest/cid-x-pta-novo-pad-item-indi.controller';
import { CidXPtaNovoPadItemIndiRepository } from '../repository/cid-x-pta-novo-pad-item-indi.repository';
import { CidXPtaNovoPadItemIndiService } from '../service/cid-x-pta-novo-pad-item-indi.service';

@Module({
  imports: [TypeOrmModule.forFeature([CidXPtaNovoPadItemIndiRepository])],
  controllers: [CidXPtaNovoPadItemIndiController],
  providers: [CidXPtaNovoPadItemIndiService],
  exports: [CidXPtaNovoPadItemIndiService]
})
export class CidXPtaNovoPadItemIndiModule {}
