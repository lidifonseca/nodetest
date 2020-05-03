import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcorrenciaProntuarioController } from '../web/rest/ocorrencia-prontuario.controller';
import { OcorrenciaProntuarioRepository } from '../repository/ocorrencia-prontuario.repository';
import { OcorrenciaProntuarioService } from '../service/ocorrencia-prontuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([OcorrenciaProntuarioRepository])],
  controllers: [OcorrenciaProntuarioController],
  providers: [OcorrenciaProntuarioService],
  exports: [OcorrenciaProntuarioService]
})
export class OcorrenciaProntuarioModule {}
