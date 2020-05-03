import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VwApiAtendimentosAceiteController } from '../web/rest/vw-api-atendimentos-aceite.controller';
import { VwApiAtendimentosAceiteRepository } from '../repository/vw-api-atendimentos-aceite.repository';
import { VwApiAtendimentosAceiteService } from '../service/vw-api-atendimentos-aceite.service';

@Module({
  imports: [TypeOrmModule.forFeature([VwApiAtendimentosAceiteRepository])],
  controllers: [VwApiAtendimentosAceiteController],
  providers: [VwApiAtendimentosAceiteService],
  exports: [VwApiAtendimentosAceiteService]
})
export class VwApiAtendimentosAceiteModule {}
