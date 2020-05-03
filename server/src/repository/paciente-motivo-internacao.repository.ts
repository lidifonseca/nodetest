import { EntityRepository, Repository } from 'typeorm';
import PacienteMotivoInternacao from '../domain/paciente-motivo-internacao.entity';

@EntityRepository(PacienteMotivoInternacao)
export class PacienteMotivoInternacaoRepository extends Repository<PacienteMotivoInternacao> {}
