import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogUserController } from '../web/rest/log-user.controller';
import { LogUserRepository } from '../repository/log-user.repository';
import { LogUserService } from '../service/log-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogUserRepository])],
  controllers: [LogUserController],
  providers: [LogUserService],
  exports: [LogUserService]
})
export class LogUserModule {}
