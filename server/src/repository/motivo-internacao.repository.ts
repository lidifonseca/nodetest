import { EntityRepository, Repository } from 'typeorm';
import MotivoInternacao from '../domain/motivo-internacao.entity';

@EntityRepository(MotivoInternacao)
export class MotivoInternacaoRepository extends Repository<MotivoInternacao> {}
