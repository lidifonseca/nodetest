import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusAtualController } from '../web/rest/status-atual.controller';
import { StatusAtualRepository } from '../repository/status-atual.repository';
import { StatusAtualService } from '../service/status-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusAtualRepository])],
  controllers: [StatusAtualController],
  providers: [StatusAtualService],
  exports: [StatusAtualService]
})
export class StatusAtualModule {}
