import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JulhoController } from '../web/rest/julho.controller';
import { JulhoRepository } from '../repository/julho.repository';
import { JulhoService } from '../service/julho.service';

@Module({
  imports: [TypeOrmModule.forFeature([JulhoRepository])],
  controllers: [JulhoController],
  providers: [JulhoService],
  exports: [JulhoService]
})
export class JulhoModule {}
