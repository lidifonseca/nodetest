import { EntityRepository, Repository } from 'typeorm';
import UnidadeEasy from '../domain/unidade-easy.entity';

@EntityRepository(UnidadeEasy)
export class UnidadeEasyRepository extends Repository<UnidadeEasy> {}
