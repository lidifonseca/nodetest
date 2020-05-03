import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoPanicoController } from '../web/rest/geo-panico.controller';
import { GeoPanicoRepository } from '../repository/geo-panico.repository';
import { GeoPanicoService } from '../service/geo-panico.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeoPanicoRepository])],
  controllers: [GeoPanicoController],
  providers: [GeoPanicoService],
  exports: [GeoPanicoService]
})
export class GeoPanicoModule {}
