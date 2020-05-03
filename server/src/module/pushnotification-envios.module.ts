import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushnotificationEnviosController } from '../web/rest/pushnotification-envios.controller';
import { PushnotificationEnviosRepository } from '../repository/pushnotification-envios.repository';
import { PushnotificationEnviosService } from '../service/pushnotification-envios.service';

@Module({
  imports: [TypeOrmModule.forFeature([PushnotificationEnviosRepository])],
  controllers: [PushnotificationEnviosController],
  providers: [PushnotificationEnviosService],
  exports: [PushnotificationEnviosService]
})
export class PushnotificationEnviosModule {}
