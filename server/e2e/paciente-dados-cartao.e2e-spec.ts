import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PacienteDadosCartao from '../src/domain/paciente-dados-cartao.entity';
import { PacienteDadosCartaoService } from '../src/service/paciente-dados-cartao.service';

describe('PacienteDadosCartao Controller', () => {
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
      .overrideProvider(PacienteDadosCartaoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all paciente-dados-cartaos ', async () => {
    const getEntities: PacienteDadosCartao[] = (
      await request(app.getHttpServer())
        .get('/api/paciente-dados-cartaos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET paciente-dados-cartaos by id', async () => {
    const getEntity: PacienteDadosCartao = (
      await request(app.getHttpServer())
        .get('/api/paciente-dados-cartaos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create paciente-dados-cartaos', async () => {
    const createdEntity: PacienteDadosCartao = (
      await request(app.getHttpServer())
        .post('/api/paciente-dados-cartaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update paciente-dados-cartaos', async () => {
    const updatedEntity: PacienteDadosCartao = (
      await request(app.getHttpServer())
        .put('/api/paciente-dados-cartaos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE paciente-dados-cartaos', async () => {
    const deletedEntity: PacienteDadosCartao = (
      await request(app.getHttpServer())
        .delete('/api/paciente-dados-cartaos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
