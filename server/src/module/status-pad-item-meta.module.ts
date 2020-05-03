import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusPadItemMetaController } from '../web/rest/status-pad-item-meta.controller';
import { StatusPadItemMetaRepository } from '../repository/status-pad-item-meta.repository';
import { StatusPadItemMetaService } from '../service/status-pad-item-meta.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusPadItemMetaRepository])],
  controllers: [StatusPadItemMetaController],
  providers: [StatusPadItemMetaService],
  exports: [StatusPadItemMetaService]
})
export class StatusPadItemMetaModule {}
