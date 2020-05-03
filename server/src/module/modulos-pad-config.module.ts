import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulosPadConfigController } from '../web/rest/modulos-pad-config.controller';
import { ModulosPadConfigRepository } from '../repository/modulos-pad-config.repository';
import { ModulosPadConfigService } from '../service/modulos-pad-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([ModulosPadConfigRepository])],
  controllers: [ModulosPadConfigController],
  providers: [ModulosPadConfigService],
  exports: [ModulosPadConfigService]
})
export class ModulosPadConfigModule {}
