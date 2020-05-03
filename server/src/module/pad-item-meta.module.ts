import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemMetaController } from '../web/rest/pad-item-meta.controller';
import { PadItemMetaRepository } from '../repository/pad-item-meta.repository';
import { PadItemMetaService } from '../service/pad-item-meta.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemMetaRepository])],
  controllers: [PadItemMetaController],
  providers: [PadItemMetaService],
  exports: [PadItemMetaService]
})
export class PadItemMetaModule {}
