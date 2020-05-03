import { EntityRepository, Repository } from 'typeorm';
import CepbrEstado from '../domain/cepbr-estado.entity';

@EntityRepository(CepbrEstado)
export class CepbrEstadoRepository extends Repository<CepbrEstado> {}
