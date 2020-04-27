import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParteController } from '../web/rest/parte.controller';
import { ParteRepository } from '../repository/parte.repository';
import { ParteService } from '../service/parte.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParteRepository])],
  controllers: [ParteController],
  providers: [ParteService],
  exports: [ParteService]
})
export class ParteModule {}
