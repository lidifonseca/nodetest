import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoExameController } from '../web/rest/tipo-exame.controller';
import { TipoExameRepository } from '../repository/tipo-exame.repository';
import { TipoExameService } from '../service/tipo-exame.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoExameRepository])],
  controllers: [TipoExameController],
  providers: [TipoExameService],
  exports: [TipoExameService]
})
export class TipoExameModule {}
