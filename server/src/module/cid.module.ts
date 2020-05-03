import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidController } from '../web/rest/cid.controller';
import { CidRepository } from '../repository/cid.repository';
import { CidService } from '../service/cid.service';

@Module({
  imports: [TypeOrmModule.forFeature([CidRepository])],
  controllers: [CidController],
  providers: [CidService],
  exports: [CidService]
})
export class CidModule {}
