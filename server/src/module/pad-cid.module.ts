import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadCidController } from '../web/rest/pad-cid.controller';
import { PadCidRepository } from '../repository/pad-cid.repository';
import { PadCidService } from '../service/pad-cid.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadCidRepository])],
  controllers: [PadCidController],
  providers: [PadCidService],
  exports: [PadCidService]
})
export class PadCidModule {}
