import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoPsController } from '../web/rest/motivo-ps.controller';
import { MotivoPsRepository } from '../repository/motivo-ps.repository';
import { MotivoPsService } from '../service/motivo-ps.service';

@Module({
  imports: [TypeOrmModule.forFeature([MotivoPsRepository])],
  controllers: [MotivoPsController],
  providers: [MotivoPsService],
  exports: [MotivoPsService]
})
export class MotivoPsModule {}
