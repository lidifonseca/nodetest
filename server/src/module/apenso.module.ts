import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApensoController } from '../web/rest/apenso.controller';
import { ApensoRepository } from '../repository/apenso.repository';
import { ApensoService } from '../service/apenso.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApensoRepository])],
  controllers: [ApensoController],
  providers: [ApensoService],
  exports: [ApensoService]
})
export class ApensoModule {}
