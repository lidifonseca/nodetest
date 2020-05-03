import { EntityRepository, Repository } from 'typeorm';
import Respostas from '../domain/respostas.entity';

@EntityRepository(Respostas)
export class RespostasRepository extends Repository<Respostas> {}
