import { EntityRepository, Repository } from 'typeorm';
import CidXPtaNovoPadItemIndi from '../domain/cid-x-pta-novo-pad-item-indi.entity';

@EntityRepository(CidXPtaNovoPadItemIndi)
export class CidXPtaNovoPadItemIndiRepository extends Repository<CidXPtaNovoPadItemIndi> {}
