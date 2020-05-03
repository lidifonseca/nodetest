import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodicidadeController } from '../web/rest/periodicidade.controller';
import { PeriodicidadeRepository } from '../repository/periodicidade.repository';
import { PeriodicidadeService } from '../service/periodicidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([PeriodicidadeRepository])],
  controllers: [PeriodicidadeController],
  providers: [PeriodicidadeService],
  exports: [PeriodicidadeService]
})
export class PeriodicidadeModule {}
