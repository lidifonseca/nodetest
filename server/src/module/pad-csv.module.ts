import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadCsvController } from '../web/rest/pad-csv.controller';
import { PadCsvRepository } from '../repository/pad-csv.repository';
import { PadCsvService } from '../service/pad-csv.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadCsvRepository])],
  controllers: [PadCsvController],
  providers: [PadCsvService],
  exports: [PadCsvService]
})
export class PadCsvModule {}
