import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatMedController } from '../web/rest/mat-med.controller';
import { MatMedRepository } from '../repository/mat-med.repository';
import { MatMedService } from '../service/mat-med.service';

@Module({
  imports: [TypeOrmModule.forFeature([MatMedRepository])],
  controllers: [MatMedController],
  providers: [MatMedService],
  exports: [MatMedService]
})
export class MatMedModule {}
