import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalArquivoController } from '../web/rest/profissional-arquivo.controller';
import { ProfissionalArquivoRepository } from '../repository/profissional-arquivo.repository';
import { ProfissionalArquivoService } from '../service/profissional-arquivo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalArquivoRepository])],
  controllers: [ProfissionalArquivoController],
  providers: [ProfissionalArquivoService],
  exports: [ProfissionalArquivoService]
})
export class ProfissionalArquivoModule {}
