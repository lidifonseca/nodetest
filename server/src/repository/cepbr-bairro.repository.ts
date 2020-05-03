import { EntityRepository, Repository } from 'typeorm';
import CepbrBairro from '../domain/cepbr-bairro.entity';

@EntityRepository(CepbrBairro)
export class CepbrBairroRepository extends Repository<CepbrBairro> {}
