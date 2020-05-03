import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtividadesController } from '../web/rest/atividades.controller';
import { AtividadesRepository } from '../repository/atividades.repository';
import { AtividadesService } from '../service/atividades.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtividadesRepository])],
  controllers: [AtividadesController],
  providers: [AtividadesService],
  exports: [AtividadesService]
})
export class AtividadesModule {}
