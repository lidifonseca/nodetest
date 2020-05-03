import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadeValorController } from '../web/rest/especialidade-valor.controller';
import { EspecialidadeValorRepository } from '../repository/especialidade-valor.repository';
import { EspecialidadeValorService } from '../service/especialidade-valor.service';

@Module({
  imports: [TypeOrmModule.forFeature([EspecialidadeValorRepository])],
  controllers: [EspecialidadeValorController],
  providers: [EspecialidadeValorService],
  exports: [EspecialidadeValorService]
})
export class EspecialidadeValorModule {}
