import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AcoesRespostas from '../src/domain/acoes-respostas.entity';
import { AcoesRespostasService } from '../src/service/acoes-respostas.service';

describe('AcoesRespostas Controller', () => {
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
      .overrideProvider(AcoesRespostasService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all acoes-respostas ', async () => {
    const getEntities: AcoesRespostas[] = (
      await request(app.getHttpServer())
        .get('/api/acoes-respostas')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET acoes-respostas by id', async () => {
    const getEntity: AcoesRespostas = (
      await request(app.getHttpServer())
        .get('/api/acoes-respostas/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create acoes-respostas', async () => {
    const createdEntity: AcoesRespostas = (
      await request(app.getHttpServer())
        .post('/api/acoes-respostas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update acoes-respostas', async () => {
    const updatedEntity: AcoesRespostas = (
      await request(app.getHttpServer())
        .put('/api/acoes-respostas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE acoes-respostas', async () => {
    const deletedEntity: AcoesRespostas = (
      await request(app.getHttpServer())
        .delete('/api/acoes-respostas/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
