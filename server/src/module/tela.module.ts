import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelaController } from '../web/rest/tela.controller';
import { TelaRepository } from '../repository/tela.repository';
import { TelaService } from '../service/tela.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelaRepository])],
  controllers: [TelaController],
  providers: [TelaService],
  exports: [TelaService]
})
export class TelaModule {}
