import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogPacAcessoController } from '../web/rest/log-pac-acesso.controller';
import { LogPacAcessoRepository } from '../repository/log-pac-acesso.repository';
import { LogPacAcessoService } from '../service/log-pac-acesso.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogPacAcessoRepository])],
  controllers: [LogPacAcessoController],
  providers: [LogPacAcessoService],
  exports: [LogPacAcessoService]
})
export class LogPacAcessoModule {}
