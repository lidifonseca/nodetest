import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemHistDataIncCompController } from '../web/rest/pad-item-hist-data-inc-comp.controller';
import { PadItemHistDataIncCompRepository } from '../repository/pad-item-hist-data-inc-comp.repository';
import { PadItemHistDataIncCompService } from '../service/pad-item-hist-data-inc-comp.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemHistDataIncCompRepository])],
  controllers: [PadItemHistDataIncCompController],
  providers: [PadItemHistDataIncCompService],
  exports: [PadItemHistDataIncCompService]
})
export class PadItemHistDataIncCompModule {}
