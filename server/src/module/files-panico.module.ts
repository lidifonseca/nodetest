import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesPanicoController } from '../web/rest/files-panico.controller';
import { FilesPanicoRepository } from '../repository/files-panico.repository';
import { FilesPanicoService } from '../service/files-panico.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilesPanicoRepository])],
  controllers: [FilesPanicoController],
  providers: [FilesPanicoService],
  exports: [FilesPanicoService]
})
export class FilesPanicoModule {}
