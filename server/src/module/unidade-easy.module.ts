import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadeEasyController } from '../web/rest/unidade-easy.controller';
import { UnidadeEasyRepository } from '../repository/unidade-easy.repository';
import { UnidadeEasyService } from '../service/unidade-easy.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadeEasyRepository])],
  controllers: [UnidadeEasyController],
  providers: [UnidadeEasyService],
  exports: [UnidadeEasyService]
})
export class UnidadeEasyModule {}
