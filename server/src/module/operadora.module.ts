import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperadoraController } from '../web/rest/operadora.controller';
import { OperadoraRepository } from '../repository/operadora.repository';
import { OperadoraService } from '../service/operadora.service';

@Module({
  imports: [TypeOrmModule.forFeature([OperadoraRepository])],
  controllers: [OperadoraController],
  providers: [OperadoraService],
  exports: [OperadoraService]
})
export class OperadoraModule {}
