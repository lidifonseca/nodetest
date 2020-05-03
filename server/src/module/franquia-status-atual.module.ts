import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranquiaStatusAtualController } from '../web/rest/franquia-status-atual.controller';
import { FranquiaStatusAtualRepository } from '../repository/franquia-status-atual.repository';
import { FranquiaStatusAtualService } from '../service/franquia-status-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([FranquiaStatusAtualRepository])],
  controllers: [FranquiaStatusAtualController],
  providers: [FranquiaStatusAtualService],
  exports: [FranquiaStatusAtualService]
})
export class FranquiaStatusAtualModule {}
