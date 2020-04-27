import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComarcaController } from '../web/rest/comarca.controller';
import { ComarcaRepository } from '../repository/comarca.repository';
import { ComarcaService } from '../service/comarca.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComarcaRepository])],
  controllers: [ComarcaController],
  providers: [ComarcaService],
  exports: [ComarcaService]
})
export class ComarcaModule {}
