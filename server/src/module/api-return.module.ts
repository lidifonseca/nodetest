import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiReturnController } from '../web/rest/api-return.controller';
import { ApiReturnRepository } from '../repository/api-return.repository';
import { ApiReturnService } from '../service/api-return.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApiReturnRepository])],
  controllers: [ApiReturnController],
  providers: [ApiReturnService],
  exports: [ApiReturnService]
})
export class ApiReturnModule {}
