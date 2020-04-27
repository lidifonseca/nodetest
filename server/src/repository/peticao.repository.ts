import { EntityRepository, Repository } from 'typeorm';
import Peticao from '../domain/peticao.entity';

@EntityRepository(Peticao)
export class PeticaoRepository extends Repository<Peticao> {}
