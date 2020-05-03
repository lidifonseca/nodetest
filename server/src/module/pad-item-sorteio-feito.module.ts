import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemSorteioFeitoController } from '../web/rest/pad-item-sorteio-feito.controller';
import { PadItemSorteioFeitoRepository } from '../repository/pad-item-sorteio-feito.repository';
import { PadItemSorteioFeitoService } from '../service/pad-item-sorteio-feito.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemSorteioFeitoRepository])],
  controllers: [PadItemSorteioFeitoController],
  providers: [PadItemSorteioFeitoService],
  exports: [PadItemSorteioFeitoService]
})
export class PadItemSorteioFeitoModule {}
