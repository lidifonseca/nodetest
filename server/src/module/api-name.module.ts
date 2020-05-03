import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiNameController } from '../web/rest/api-name.controller';
import { ApiNameRepository } from '../repository/api-name.repository';
import { ApiNameService } from '../service/api-name.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApiNameRepository])],
  controllers: [ApiNameController],
  providers: [ApiNameService],
  exports: [ApiNameService]
})
export class ApiNameModule {}
