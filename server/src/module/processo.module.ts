import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessoController } from '../web/rest/processo.controller';
import { ProcessoRepository } from '../repository/processo.repository';
import { ProcessoService } from '../service/processo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessoRepository])],
  controllers: [ProcessoController],
  providers: [ProcessoService],
  exports: [ProcessoService]
})
export class ProcessoModule {}
