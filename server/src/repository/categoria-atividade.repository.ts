import { EntityRepository, Repository } from 'typeorm';
import CategoriaAtividade from '../domain/categoria-atividade.entity';

@EntityRepository(CategoriaAtividade)
export class CategoriaAtividadeRepository extends Repository<CategoriaAtividade> {}
