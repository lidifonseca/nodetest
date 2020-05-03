import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermosUsoController } from '../web/rest/termos-uso.controller';
import { TermosUsoRepository } from '../repository/termos-uso.repository';
import { TermosUsoService } from '../service/termos-uso.service';

@Module({
  imports: [TypeOrmModule.forFeature([TermosUsoRepository])],
  controllers: [TermosUsoController],
  providers: [TermosUsoService],
  exports: [TermosUsoService]
})
export class TermosUsoModule {}
