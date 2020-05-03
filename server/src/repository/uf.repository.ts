import { EntityRepository, Repository } from 'typeorm';
import Uf from '../domain/uf.entity';

@EntityRepository(Uf)
export class UfRepository extends Repository<Uf> {}
