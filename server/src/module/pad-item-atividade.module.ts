import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemAtividadeController } from '../web/rest/pad-item-atividade.controller';
import { PadItemAtividadeRepository } from '../repository/pad-item-atividade.repository';
import { PadItemAtividadeService } from '../service/pad-item-atividade.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemAtividadeRepository])],
  controllers: [PadItemAtividadeController],
  providers: [PadItemAtividadeService],
  exports: [PadItemAtividadeService]
})
export class PadItemAtividadeModule {}
