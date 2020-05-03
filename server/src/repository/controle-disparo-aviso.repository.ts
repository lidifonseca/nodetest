import { EntityRepository, Repository } from 'typeorm';
import ControleDisparoAviso from '../domain/controle-disparo-aviso.entity';

@EntityRepository(ControleDisparoAviso)
export class ControleDisparoAvisoRepository extends Repository<ControleDisparoAviso> {}
