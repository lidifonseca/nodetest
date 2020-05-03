import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhinxlogController } from '../web/rest/phinxlog.controller';
import { PhinxlogRepository } from '../repository/phinxlog.repository';
import { PhinxlogService } from '../service/phinxlog.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhinxlogRepository])],
  controllers: [PhinxlogController],
  providers: [PhinxlogService],
  exports: [PhinxlogService]
})
export class PhinxlogModule {}
