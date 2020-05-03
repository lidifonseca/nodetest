import { EntityRepository, Repository } from 'typeorm';
import Tela from '../domain/tela.entity';

@EntityRepository(Tela)
export class TelaRepository extends Repository<Tela> {}
