import { EntityRepository, Repository } from 'typeorm';
import Pesquisa from '../domain/pesquisa.entity';

@EntityRepository(Pesquisa)
export class PesquisaRepository extends Repository<Pesquisa> {}
