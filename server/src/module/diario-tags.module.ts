import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiarioTagsController } from '../web/rest/diario-tags.controller';
import { DiarioTagsRepository } from '../repository/diario-tags.repository';
import { DiarioTagsService } from '../service/diario-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiarioTagsRepository])],
  controllers: [DiarioTagsController],
  providers: [DiarioTagsService],
  exports: [DiarioTagsService]
})
export class DiarioTagsModule {}
