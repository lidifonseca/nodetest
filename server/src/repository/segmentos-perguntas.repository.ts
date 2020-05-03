import { EntityRepository, Repository } from 'typeorm';
import SegmentosPerguntas from '../domain/segmentos-perguntas.entity';

@EntityRepository(SegmentosPerguntas)
export class SegmentosPerguntasRepository extends Repository<SegmentosPerguntas> {}
