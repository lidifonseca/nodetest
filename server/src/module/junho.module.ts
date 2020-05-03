import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JunhoController } from '../web/rest/junho.controller';
import { JunhoRepository } from '../repository/junho.repository';
import { JunhoService } from '../service/junho.service';

@Module({
  imports: [TypeOrmModule.forFeature([JunhoRepository])],
  controllers: [JunhoController],
  providers: [JunhoService],
  exports: [JunhoService]
})
export class JunhoModule {}
