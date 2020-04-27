import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PesquisaController } from '../web/rest/pesquisa.controller';
import { PesquisaRepository } from '../repository/pesquisa.repository';
import { PesquisaService } from '../service/pesquisa.service';

@Module({
  imports: [TypeOrmModule.forFeature([PesquisaRepository])],
  controllers: [PesquisaController],
  providers: [PesquisaService],
  exports: [PesquisaService]
})
export class PesquisaModule {}
