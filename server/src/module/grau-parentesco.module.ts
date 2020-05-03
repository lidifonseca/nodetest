import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrauParentescoController } from '../web/rest/grau-parentesco.controller';
import { GrauParentescoRepository } from '../repository/grau-parentesco.repository';
import { GrauParentescoService } from '../service/grau-parentesco.service';

@Module({
  imports: [TypeOrmModule.forFeature([GrauParentescoRepository])],
  controllers: [GrauParentescoController],
  providers: [GrauParentescoService],
  exports: [GrauParentescoService]
})
export class GrauParentescoModule {}
