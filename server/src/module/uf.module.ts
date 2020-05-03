import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UfController } from '../web/rest/uf.controller';
import { UfRepository } from '../repository/uf.repository';
import { UfService } from '../service/uf.service';

@Module({
  imports: [TypeOrmModule.forFeature([UfRepository])],
  controllers: [UfController],
  providers: [UfService],
  exports: [UfService]
})
export class UfModule {}
