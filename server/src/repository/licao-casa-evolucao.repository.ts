import { EntityRepository, Repository } from 'typeorm';
import LicaoCasaEvolucao from '../domain/licao-casa-evolucao.entity';

@EntityRepository(LicaoCasaEvolucao)
export class LicaoCasaEvolucaoRepository extends Repository<LicaoCasaEvolucao> {}
