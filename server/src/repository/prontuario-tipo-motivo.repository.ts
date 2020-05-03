import { EntityRepository, Repository } from 'typeorm';
import ProntuarioTipoMotivo from '../domain/prontuario-tipo-motivo.entity';

@EntityRepository(ProntuarioTipoMotivo)
export class ProntuarioTipoMotivoRepository extends Repository<ProntuarioTipoMotivo> {}
