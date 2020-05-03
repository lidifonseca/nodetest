import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AtendimentoCepRecusado from '../src/domain/atendimento-cep-recusado.entity';
import { AtendimentoCepRecusadoService } from '../src/service/atendimento-cep-recusado.service';

describe('AtendimentoCepRecusado Controller', () => {
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
      .overrideProvider(AtendimentoCepRecusadoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all atendimento-cep-recusados ', async () => {
    const getEntities: AtendimentoCepRecusado[] = (
      await request(app.getHttpServer())
        .get('/api/atendimento-cep-recusados')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET atendimento-cep-recusados by id', async () => {
    const getEntity: AtendimentoCepRecusado = (
      await request(app.getHttpServer())
        .get('/api/atendimento-cep-recusados/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create atendimento-cep-recusados', async () => {
    const createdEntity: AtendimentoCepRecusado = (
      await request(app.getHttpServer())
        .post('/api/atendimento-cep-recusados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update atendimento-cep-recusados', async () => {
    const updatedEntity: AtendimentoCepRecusado = (
      await request(app.getHttpServer())
        .put('/api/atendimento-cep-recusados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE atendimento-cep-recusados', async () => {
    const deletedEntity: AtendimentoCepRecusado = (
      await request(app.getHttpServer())
        .delete('/api/atendimento-cep-recusados/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
