import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemController } from '../web/rest/pad-item.controller';
import { PadItemRepository } from '../repository/pad-item.repository';
import { PadItemService } from '../service/pad-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemRepository])],
  controllers: [PadItemController],
  providers: [PadItemService],
  exports: [PadItemService]
})
export class PadItemModule {}
