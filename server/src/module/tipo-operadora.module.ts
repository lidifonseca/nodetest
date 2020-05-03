import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoOperadoraController } from '../web/rest/tipo-operadora.controller';
import { TipoOperadoraRepository } from '../repository/tipo-operadora.repository';
import { TipoOperadoraService } from '../service/tipo-operadora.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoOperadoraRepository])],
  controllers: [TipoOperadoraController],
  providers: [TipoOperadoraService],
  exports: [TipoOperadoraService]
})
export class TipoOperadoraModule {}
