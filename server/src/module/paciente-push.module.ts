import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientePushController } from '../web/rest/paciente-push.controller';
import { PacientePushRepository } from '../repository/paciente-push.repository';
import { PacientePushService } from '../service/paciente-push.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacientePushRepository])],
  controllers: [PacientePushController],
  providers: [PacientePushService],
  exports: [PacientePushService]
})
export class PacientePushModule {}
