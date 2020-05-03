import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemTempController } from '../web/rest/pad-item-temp.controller';
import { PadItemTempRepository } from '../repository/pad-item-temp.repository';
import { PadItemTempService } from '../service/pad-item-temp.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemTempRepository])],
  controllers: [PadItemTempController],
  providers: [PadItemTempService],
  exports: [PadItemTempService]
})
export class PadItemTempModule {}
