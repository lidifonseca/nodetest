import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalAreaAtuacaoNewController } from '../web/rest/profissional-area-atuacao-new.controller';
import { ProfissionalAreaAtuacaoNewRepository } from '../repository/profissional-area-atuacao-new.repository';
import { ProfissionalAreaAtuacaoNewService } from '../service/profissional-area-atuacao-new.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalAreaAtuacaoNewRepository])],
  controllers: [ProfissionalAreaAtuacaoNewController],
  providers: [ProfissionalAreaAtuacaoNewService],
  exports: [ProfissionalAreaAtuacaoNewService]
})
export class ProfissionalAreaAtuacaoNewModule {}
