import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidadeController } from '../web/rest/cidade.controller';
import { CidadeRepository } from '../repository/cidade.repository';
import { CidadeService } from '../service/cidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([CidadeRepository])],
  controllers: [CidadeController],
  providers: [CidadeService],
  exports: [CidadeService]
})
export class CidadeModule {}
