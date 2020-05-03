import { EntityRepository, Repository } from 'typeorm';
import Julho from '../domain/julho.entity';

@EntityRepository(Julho)
export class JulhoRepository extends Repository<Julho> {}
