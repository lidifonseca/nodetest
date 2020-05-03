import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import VwApiAtendimentosAceite from '../src/domain/vw-api-atendimentos-aceite.entity';
import { VwApiAtendimentosAceiteService } from '../src/service/vw-api-atendimentos-aceite.service';

describe('VwApiAtendimentosAceite Controller', () => {
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
      .overrideProvider(VwApiAtendimentosAceiteService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all vw-api-atendimentos-aceites ', async () => {
    const getEntities: VwApiAtendimentosAceite[] = (
      await request(app.getHttpServer())
        .get('/api/vw-api-atendimentos-aceites')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET vw-api-atendimentos-aceites by id', async () => {
    const getEntity: VwApiAtendimentosAceite = (
      await request(app.getHttpServer())
        .get('/api/vw-api-atendimentos-aceites/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create vw-api-atendimentos-aceites', async () => {
    const createdEntity: VwApiAtendimentosAceite = (
      await request(app.getHttpServer())
        .post('/api/vw-api-atendimentos-aceites')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update vw-api-atendimentos-aceites', async () => {
    const updatedEntity: VwApiAtendimentosAceite = (
      await request(app.getHttpServer())
        .put('/api/vw-api-atendimentos-aceites')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE vw-api-atendimentos-aceites', async () => {
    const deletedEntity: VwApiAtendimentosAceite = (
      await request(app.getHttpServer())
        .delete('/api/vw-api-atendimentos-aceites/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
