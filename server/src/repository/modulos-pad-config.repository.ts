import { EntityRepository, Repository } from 'typeorm';
import ModulosPadConfig from '../domain/modulos-pad-config.entity';

@EntityRepository(ModulosPadConfig)
export class ModulosPadConfigRepository extends Repository<ModulosPadConfig> {}
