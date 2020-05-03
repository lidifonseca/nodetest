import { EntityRepository, Repository } from 'typeorm';
import ProntuarioMotivoInternacaoPs from '../domain/prontuario-motivo-internacao-ps.entity';

@EntityRepository(ProntuarioMotivoInternacaoPs)
export class ProntuarioMotivoInternacaoPsRepository extends Repository<ProntuarioMotivoInternacaoPs> {}
