import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoController } from '../web/rest/estado.controller';
import { EstadoRepository } from '../repository/estado.repository';
import { EstadoService } from '../service/estado.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoRepository])],
  controllers: [EstadoController],
  providers: [EstadoService],
  exports: [EstadoService]
})
export class EstadoModule {}
