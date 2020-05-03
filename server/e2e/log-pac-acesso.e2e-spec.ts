import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import LogPacAcesso from '../src/domain/log-pac-acesso.entity';
import { LogPacAcessoService } from '../src/service/log-pac-acesso.service';

describe('LogPacAcesso Controller', () => {
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
      .overrideProvider(LogPacAcessoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all log-pac-acessos ', async () => {
    const getEntities: LogPacAcesso[] = (
      await request(app.getHttpServer())
        .get('/api/log-pac-acessos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET log-pac-acessos by id', async () => {
    const getEntity: LogPacAcesso = (
      await request(app.getHttpServer())
        .get('/api/log-pac-acessos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create log-pac-acessos', async () => {
    const createdEntity: LogPacAcesso = (
      await request(app.getHttpServer())
        .post('/api/log-pac-acessos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update log-pac-acessos', async () => {
    const updatedEntity: LogPacAcesso = (
      await request(app.getHttpServer())
        .put('/api/log-pac-acessos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE log-pac-acessos', async () => {
    const deletedEntity: LogPacAcesso = (
      await request(app.getHttpServer())
        .delete('/api/log-pac-acessos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
