import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeticaoController } from '../web/rest/peticao.controller';
import { PeticaoRepository } from '../repository/peticao.repository';
import { PeticaoService } from '../service/peticao.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeticaoRepository])],
  controllers: [PeticaoController],
  providers: [PeticaoService],
  exports: [PeticaoService]
})
export class PeticaoModule {}
