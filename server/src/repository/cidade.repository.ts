import { EntityRepository, Repository } from 'typeorm';
import Cidade from '../domain/cidade.entity';

@EntityRepository(Cidade)
export class CidadeRepository extends Repository<Cidade> {}
