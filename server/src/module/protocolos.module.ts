import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolosController } from '../web/rest/protocolos.controller';
import { ProtocolosRepository } from '../repository/protocolos.repository';
import { ProtocolosService } from '../service/protocolos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProtocolosRepository])],
  controllers: [ProtocolosController],
  providers: [ProtocolosService],
  exports: [ProtocolosService]
})
export class ProtocolosModule {}
