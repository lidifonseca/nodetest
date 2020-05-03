import { EntityRepository, Repository } from 'typeorm';
import CepbrCidade from '../domain/cepbr-cidade.entity';

@EntityRepository(CepbrCidade)
export class CepbrCidadeRepository extends Repository<CepbrCidade> {}
