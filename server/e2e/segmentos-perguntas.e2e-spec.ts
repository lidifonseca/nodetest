import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import SegmentosPerguntas from '../src/domain/segmentos-perguntas.entity';
import { SegmentosPerguntasService } from '../src/service/segmentos-perguntas.service';

describe('SegmentosPerguntas Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(SegmentosPerguntasService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all segmentos-perguntas ', async () => {
    const getEntities: SegmentosPerguntas[] = (
      await request(app.getHttpServer())
        .get('/api/segmentos-perguntas')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET segmentos-perguntas by id', async () => {
    const getEntity: SegmentosPerguntas = (
      await request(app.getHttpServer())
        .get('/api/segmentos-perguntas/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create segmentos-perguntas', async () => {
    const createdEntity: SegmentosPerguntas = (
      await request(app.getHttpServer())
        .post('/api/segmentos-perguntas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update segmentos-perguntas', async () => {
    const updatedEntity: SegmentosPerguntas = (
      await request(app.getHttpServer())
        .put('/api/segmentos-perguntas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE segmentos-perguntas', async () => {
    const deletedEntity: SegmentosPerguntas = (
      await request(app.getHttpServer())
        .delete('/api/segmentos-perguntas/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
