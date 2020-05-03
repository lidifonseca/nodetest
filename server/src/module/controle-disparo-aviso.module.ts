import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControleDisparoAvisoController } from '../web/rest/controle-disparo-aviso.controller';
import { ControleDisparoAvisoRepository } from '../repository/controle-disparo-aviso.repository';
import { ControleDisparoAvisoService } from '../service/controle-disparo-aviso.service';

@Module({
  imports: [TypeOrmModule.forFeature([ControleDisparoAvisoRepository])],
  controllers: [ControleDisparoAvisoController],
  providers: [ControleDisparoAvisoService],
  exports: [ControleDisparoAvisoService]
})
export class ControleDisparoAvisoModule {}
