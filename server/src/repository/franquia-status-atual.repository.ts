import { EntityRepository, Repository } from 'typeorm';
import FranquiaStatusAtual from '../domain/franquia-status-atual.entity';

@EntityRepository(FranquiaStatusAtual)
export class FranquiaStatusAtualRepository extends Repository<FranquiaStatusAtual> {}
