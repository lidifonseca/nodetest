import { EntityRepository, Repository } from 'typeorm';
import GeoPanico from '../domain/geo-panico.entity';

@EntityRepository(GeoPanico)
export class GeoPanicoRepository extends Repository<GeoPanico> {}
