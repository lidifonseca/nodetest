import { EntityRepository, Repository } from 'typeorm';
import Maio from '../domain/maio.entity';

@EntityRepository(Maio)
export class MaioRepository extends Repository<Maio> {}
