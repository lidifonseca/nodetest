import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulosPadController } from '../web/rest/modulos-pad.controller';
import { ModulosPadRepository } from '../repository/modulos-pad.repository';
import { ModulosPadService } from '../service/modulos-pad.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModulosPadRepository])],
  controllers: [ModulosPadController],
  providers: [ModulosPadService],
  exports: [ModulosPadService]
})
export class ModulosPadModule {}
