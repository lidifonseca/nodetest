import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import AtendimentoImagem from '../src/domain/atendimento-imagem.entity';
import { AtendimentoImagemService } from '../src/service/atendimento-imagem.service';

describe('AtendimentoImagem Controller', () => {
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
      .overrideProvider(AtendimentoImagemService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all atendimento-imagems ', async () => {
    const getEntities: AtendimentoImagem[] = (
      await request(app.getHttpServer())
        .get('/api/atendimento-imagems')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET atendimento-imagems by id', async () => {
    const getEntity: AtendimentoImagem = (
      await request(app.getHttpServer())
        .get('/api/atendimento-imagems/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create atendimento-imagems', async () => {
    const createdEntity: AtendimentoImagem = (
      await request(app.getHttpServer())
        .post('/api/atendimento-imagems')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update atendimento-imagems', async () => {
    const updatedEntity: AtendimentoImagem = (
      await request(app.getHttpServer())
        .put('/api/atendimento-imagems')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE atendimento-imagems', async () => {
    const deletedEntity: AtendimentoImagem = (
      await request(app.getHttpServer())
        .delete('/api/atendimento-imagems/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
