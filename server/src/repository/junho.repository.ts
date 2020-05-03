import { EntityRepository, Repository } from 'typeorm';
import Junho from '../domain/junho.entity';

@EntityRepository(Junho)
export class JunhoRepository extends Repository<Junho> {}
