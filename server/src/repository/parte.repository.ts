import { EntityRepository, Repository } from 'typeorm';
import Parte from '../domain/parte.entity';

@EntityRepository(Parte)
export class ParteRepository extends Repository<Parte> {}
