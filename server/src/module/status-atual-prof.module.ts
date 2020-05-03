import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusAtualProfController } from '../web/rest/status-atual-prof.controller';
import { StatusAtualProfRepository } from '../repository/status-atual-prof.repository';
import { StatusAtualProfService } from '../service/status-atual-prof.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusAtualProfRepository])],
  controllers: [StatusAtualProfController],
  providers: [StatusAtualProfService],
  exports: [StatusAtualProfService]
})
export class StatusAtualProfModule {}
