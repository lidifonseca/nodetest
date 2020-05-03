import { EntityRepository, Repository } from 'typeorm';
import CidXPtaNovoPadItemIndicadores from '../domain/cid-x-pta-novo-pad-item-indicadores.entity';

@EntityRepository(CidXPtaNovoPadItemIndicadores)
export class CidXPtaNovoPadItemIndicadoresRepository extends Repository<CidXPtaNovoPadItemIndicadores> {}
