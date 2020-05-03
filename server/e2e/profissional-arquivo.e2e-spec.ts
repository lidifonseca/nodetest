import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalArquivo from '../src/domain/profissional-arquivo.entity';
import { ProfissionalArquivoService } from '../src/service/profissional-arquivo.service';

describe('ProfissionalArquivo Controller', () => {
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
      .overrideProvider(ProfissionalArquivoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-arquivos ', async () => {
    const getEntities: ProfissionalArquivo[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-arquivos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-arquivos by id', async () => {
    const getEntity: ProfissionalArquivo = (
      await request(app.getHttpServer())
        .get('/api/profissional-arquivos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-arquivos', async () => {
    const createdEntity: ProfissionalArquivo = (
      await request(app.getHttpServer())
        .post('/api/profissional-arquivos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-arquivos', async () => {
    const updatedEntity: ProfissionalArquivo = (
      await request(app.getHttpServer())
        .put('/api/profissional-arquivos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-arquivos', async () => {
    const deletedEntity: ProfissionalArquivo = (
      await request(app.getHttpServer())
        .delete('/api/profissional-arquivos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
