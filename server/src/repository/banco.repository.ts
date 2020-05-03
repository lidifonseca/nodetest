import { EntityRepository, Repository } from 'typeorm';
import Banco from '../domain/banco.entity';

@EntityRepository(Banco)
export class BancoRepository extends Repository<Banco> {}
