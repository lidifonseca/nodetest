import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AtendimentoGlosado from '../src/domain/atendimento-glosado.entity';
import { AtendimentoGlosadoService } from '../src/service/atendimento-glosado.service';

describe('AtendimentoGlosado Controller', () => {
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
      .overrideProvider(AtendimentoGlosadoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all atendimento-glosados ', async () => {
    const getEntities: AtendimentoGlosado[] = (
      await request(app.getHttpServer())
        .get('/api/atendimento-glosados')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET atendimento-glosados by id', async () => {
    const getEntity: AtendimentoGlosado = (
      await request(app.getHttpServer())
        .get('/api/atendimento-glosados/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create atendimento-glosados', async () => {
    const createdEntity: AtendimentoGlosado = (
      await request(app.getHttpServer())
        .post('/api/atendimento-glosados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update atendimento-glosados', async () => {
    const updatedEntity: AtendimentoGlosado = (
      await request(app.getHttpServer())
        .put('/api/atendimento-glosados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE atendimento-glosados', async () => {
    const deletedEntity: AtendimentoGlosado = (
      await request(app.getHttpServer())
        .delete('/api/atendimento-glosados/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
