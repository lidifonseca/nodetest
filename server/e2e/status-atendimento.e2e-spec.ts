import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import StatusAtendimento from '../src/domain/status-atendimento.entity';
import { StatusAtendimentoService } from '../src/service/status-atendimento.service';

describe('StatusAtendimento Controller', () => {
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
      .overrideProvider(StatusAtendimentoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all status-atendimentos ', async () => {
    const getEntities: StatusAtendimento[] = (
      await request(app.getHttpServer())
        .get('/api/status-atendimentos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET status-atendimentos by id', async () => {
    const getEntity: StatusAtendimento = (
      await request(app.getHttpServer())
        .get('/api/status-atendimentos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create status-atendimentos', async () => {
    const createdEntity: StatusAtendimento = (
      await request(app.getHttpServer())
        .post('/api/status-atendimentos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update status-atendimentos', async () => {
    const updatedEntity: StatusAtendimento = (
      await request(app.getHttpServer())
        .put('/api/status-atendimentos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE status-atendimentos', async () => {
    const deletedEntity: StatusAtendimento = (
      await request(app.getHttpServer())
        .delete('/api/status-atendimentos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
