import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusFinanceiroController } from '../web/rest/status-financeiro.controller';
import { StatusFinanceiroRepository } from '../repository/status-financeiro.repository';
import { StatusFinanceiroService } from '../service/status-financeiro.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusFinanceiroRepository])],
  controllers: [StatusFinanceiroController],
  providers: [StatusFinanceiroService],
  exports: [StatusFinanceiroService]
})
export class StatusFinanceiroModule {}
