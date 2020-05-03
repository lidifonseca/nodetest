import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TipoPreferenciaAtendimento from '../src/domain/tipo-preferencia-atendimento.entity';
import { TipoPreferenciaAtendimentoService } from '../src/service/tipo-preferencia-atendimento.service';

describe('TipoPreferenciaAtendimento Controller', () => {
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
      .overrideProvider(TipoPreferenciaAtendimentoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tipo-preferencia-atendimentos ', async () => {
    const getEntities: TipoPreferenciaAtendimento[] = (
      await request(app.getHttpServer())
        .get('/api/tipo-preferencia-atendimentos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tipo-preferencia-atendimentos by id', async () => {
    const getEntity: TipoPreferenciaAtendimento = (
      await request(app.getHttpServer())
        .get('/api/tipo-preferencia-atendimentos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tipo-preferencia-atendimentos', async () => {
    const createdEntity: TipoPreferenciaAtendimento = (
      await request(app.getHttpServer())
        .post('/api/tipo-preferencia-atendimentos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tipo-preferencia-atendimentos', async () => {
    const updatedEntity: TipoPreferenciaAtendimento = (
      await request(app.getHttpServer())
        .put('/api/tipo-preferencia-atendimentos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tipo-preferencia-atendimentos', async () => {
    const deletedEntity: TipoPreferenciaAtendimento = (
      await request(app.getHttpServer())
        .delete('/api/tipo-preferencia-atendimentos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
