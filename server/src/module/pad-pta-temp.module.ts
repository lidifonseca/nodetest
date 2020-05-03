import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadPtaTempController } from '../web/rest/pad-pta-temp.controller';
import { PadPtaTempRepository } from '../repository/pad-pta-temp.repository';
import { PadPtaTempService } from '../service/pad-pta-temp.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadPtaTempRepository])],
  controllers: [PadPtaTempController],
  providers: [PadPtaTempService],
  exports: [PadPtaTempService]
})
export class PadPtaTempModule {}
