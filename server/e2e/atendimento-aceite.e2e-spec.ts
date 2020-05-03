import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AtendimentoAceite from '../src/domain/atendimento-aceite.entity';
import { AtendimentoAceiteService } from '../src/service/atendimento-aceite.service';

describe('AtendimentoAceite Controller', () => {
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
      .overrideProvider(AtendimentoAceiteService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all atendimento-aceites ', async () => {
    const getEntities: AtendimentoAceite[] = (
      await request(app.getHttpServer())
        .get('/api/atendimento-aceites')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET atendimento-aceites by id', async () => {
    const getEntity: AtendimentoAceite = (
      await request(app.getHttpServer())
        .get('/api/atendimento-aceites/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create atendimento-aceites', async () => {
    const createdEntity: AtendimentoAceite = (
      await request(app.getHttpServer())
        .post('/api/atendimento-aceites')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update atendimento-aceites', async () => {
    const updatedEntity: AtendimentoAceite = (
      await request(app.getHttpServer())
        .put('/api/atendimento-aceites')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE atendimento-aceites', async () => {
    const deletedEntity: AtendimentoAceite = (
      await request(app.getHttpServer())
        .delete('/api/atendimento-aceites/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
