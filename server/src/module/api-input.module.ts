import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiInputController } from '../web/rest/api-input.controller';
import { ApiInputRepository } from '../repository/api-input.repository';
import { ApiInputService } from '../service/api-input.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApiInputRepository])],
  controllers: [ApiInputController],
  providers: [ApiInputService],
  exports: [ApiInputService]
})
export class ApiInputModule {}
