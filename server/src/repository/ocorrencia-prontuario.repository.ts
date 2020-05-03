import { EntityRepository, Repository } from 'typeorm';
import OcorrenciaProntuario from '../domain/ocorrencia-prontuario.entity';

@EntityRepository(OcorrenciaProntuario)
export class OcorrenciaProntuarioRepository extends Repository<OcorrenciaProntuario> {}
