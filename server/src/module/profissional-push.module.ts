import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalPushController } from '../web/rest/profissional-push.controller';
import { ProfissionalPushRepository } from '../repository/profissional-push.repository';
import { ProfissionalPushService } from '../service/profissional-push.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalPushRepository])],
  controllers: [ProfissionalPushController],
  providers: [ProfissionalPushService],
  exports: [ProfissionalPushService]
})
export class ProfissionalPushModule {}
