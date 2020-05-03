import { EntityRepository, Repository } from 'typeorm';
import Acao from '../domain/acao.entity';

@EntityRepository(Acao)
export class AcaoRepository extends Repository<Acao> {}
