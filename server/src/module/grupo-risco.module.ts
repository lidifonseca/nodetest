import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoRiscoController } from '../web/rest/grupo-risco.controller';
import { GrupoRiscoRepository } from '../repository/grupo-risco.repository';
import { GrupoRiscoService } from '../service/grupo-risco.service';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoRiscoRepository])],
  controllers: [GrupoRiscoController],
  providers: [GrupoRiscoService],
  exports: [GrupoRiscoService]
})
export class GrupoRiscoModule {}
