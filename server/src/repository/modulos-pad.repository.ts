import { EntityRepository, Repository } from 'typeorm';
import ModulosPad from '../domain/modulos-pad.entity';

@EntityRepository(ModulosPad)
export class ModulosPadRepository extends Repository<ModulosPad> {}
