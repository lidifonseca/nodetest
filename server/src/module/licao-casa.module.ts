import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicaoCasaController } from '../web/rest/licao-casa.controller';
import { LicaoCasaRepository } from '../repository/licao-casa.repository';
import { LicaoCasaService } from '../service/licao-casa.service';

@Module({
  imports: [TypeOrmModule.forFeature([LicaoCasaRepository])],
  controllers: [LicaoCasaController],
  providers: [LicaoCasaService],
  exports: [LicaoCasaService]
})
export class LicaoCasaModule {}
