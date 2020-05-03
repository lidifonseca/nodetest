import { EntityRepository, Repository } from 'typeorm';
import LicaoCasa from '../domain/licao-casa.entity';

@EntityRepository(LicaoCasa)
export class LicaoCasaRepository extends Repository<LicaoCasa> {}
