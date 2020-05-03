import { EntityRepository, Repository } from 'typeorm';
import Profissional from '../domain/profissional.entity';

@EntityRepository(Profissional)
export class ProfissionalRepository extends Repository<Profissional> {}
