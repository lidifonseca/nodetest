import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import StatusAtualLigacao from '../src/domain/status-atual-ligacao.entity';
import { StatusAtualLigacaoService } from '../src/service/status-atual-ligacao.service';

describe('StatusAtualLigacao Controller', () => {
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
      .overrideProvider(StatusAtualLigacaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all status-atual-ligacaos ', async () => {
    const getEntities: StatusAtualLigacao[] = (
      await request(app.getHttpServer())
        .get('/api/status-atual-ligacaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET status-atual-ligacaos by id', async () => {
    const getEntity: StatusAtualLigacao = (
      await request(app.getHttpServer())
        .get('/api/status-atual-ligacaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create status-atual-ligacaos', async () => {
    const createdEntity: StatusAtualLigacao = (
      await request(app.getHttpServer())
        .post('/api/status-atual-ligacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update status-atual-ligacaos', async () => {
    const updatedEntity: StatusAtualLigacao = (
      await request(app.getHttpServer())
        .put('/api/status-atual-ligacaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE status-atual-ligacaos', async () => {
    const deletedEntity: StatusAtualLigacao = (
      await request(app.getHttpServer())
        .delete('/api/status-atual-ligacaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
