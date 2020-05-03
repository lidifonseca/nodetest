import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BancoController } from '../web/rest/banco.controller';
import { BancoRepository } from '../repository/banco.repository';
import { BancoService } from '../service/banco.service';

@Module({
  imports: [TypeOrmModule.forFeature([BancoRepository])],
  controllers: [BancoController],
  providers: [BancoService],
  exports: [BancoService]
})
export class BancoModule {}
