import { EntityRepository, Repository } from 'typeorm';
import AcoesRespostas from '../domain/acoes-respostas.entity';

@EntityRepository(AcoesRespostas)
export class AcoesRespostasRepository extends Repository<AcoesRespostas> {}
