import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogUserFranquiaController } from '../web/rest/log-user-franquia.controller';
import { LogUserFranquiaRepository } from '../repository/log-user-franquia.repository';
import { LogUserFranquiaService } from '../service/log-user-franquia.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogUserFranquiaRepository])],
  controllers: [LogUserFranquiaController],
  providers: [LogUserFranquiaService],
  exports: [LogUserFranquiaService]
})
export class LogUserFranquiaModule {}
