import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CepbrCidadeController } from '../web/rest/cepbr-cidade.controller';
import { CepbrCidadeRepository } from '../repository/cepbr-cidade.repository';
import { CepbrCidadeService } from '../service/cepbr-cidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([CepbrCidadeRepository])],
  controllers: [CepbrCidadeController],
  providers: [CepbrCidadeService],
  exports: [CepbrCidadeService]
})
export class CepbrCidadeModule {}
