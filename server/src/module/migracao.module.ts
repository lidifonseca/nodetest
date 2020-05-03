import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigracaoController } from '../web/rest/migracao.controller';
import { MigracaoRepository } from '../repository/migracao.repository';
import { MigracaoService } from '../service/migracao.service';

@Module({
  imports: [TypeOrmModule.forFeature([MigracaoRepository])],
  controllers: [MigracaoController],
  providers: [MigracaoService],
  exports: [MigracaoService]
})
export class MigracaoModule {}
