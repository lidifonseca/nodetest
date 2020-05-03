import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaioController } from '../web/rest/maio.controller';
import { MaioRepository } from '../repository/maio.repository';
import { MaioService } from '../service/maio.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaioRepository])],
  controllers: [MaioController],
  providers: [MaioService],
  exports: [MaioService]
})
export class MaioModule {}
