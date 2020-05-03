import { EntityRepository, Repository } from 'typeorm';
import Migracao from '../domain/migracao.entity';

@EntityRepository(Migracao)
export class MigracaoRepository extends Repository<Migracao> {}
