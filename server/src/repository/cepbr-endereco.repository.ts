import { EntityRepository, Repository } from 'typeorm';
import CepbrEndereco from '../domain/cepbr-endereco.entity';

@EntityRepository(CepbrEndereco)
export class CepbrEnderecoRepository extends Repository<CepbrEndereco> {}
