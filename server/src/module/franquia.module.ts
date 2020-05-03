import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranquiaController } from '../web/rest/franquia.controller';
import { FranquiaRepository } from '../repository/franquia.repository';
import { FranquiaService } from '../service/franquia.service';

@Module({
  imports: [TypeOrmModule.forFeature([FranquiaRepository])],
  controllers: [FranquiaController],
  providers: [FranquiaService],
  exports: [FranquiaService]
})
export class FranquiaModule {}
