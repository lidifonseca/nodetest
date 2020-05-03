import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagemProntuarioController } from '../web/rest/imagem-prontuario.controller';
import { ImagemProntuarioRepository } from '../repository/imagem-prontuario.repository';
import { ImagemProntuarioService } from '../service/imagem-prontuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImagemProntuarioRepository])],
  controllers: [ImagemProntuarioController],
  providers: [ImagemProntuarioService],
  exports: [ImagemProntuarioService]
})
export class ImagemProntuarioModule {}
