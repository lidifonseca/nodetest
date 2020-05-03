import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoController } from '../web/rest/servico.controller';
import { ServicoRepository } from '../repository/servico.repository';
import { ServicoService } from '../service/servico.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServicoRepository])],
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [ServicoService]
})
export class ServicoModule {}
