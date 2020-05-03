import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import CategoriaAtividade from '../src/domain/categoria-atividade.entity';
import { CategoriaAtividadeService } from '../src/service/categoria-atividade.service';

describe('CategoriaAtividade Controller', () => {
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
      .overrideProvider(CategoriaAtividadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all categoria-atividades ', async () => {
    const getEntities: CategoriaAtividade[] = (
      await request(app.getHttpServer())
        .get('/api/categoria-atividades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET categoria-atividades by id', async () => {
    const getEntity: CategoriaAtividade = (
      await request(app.getHttpServer())
        .get('/api/categoria-atividades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create categoria-atividades', async () => {
    const createdEntity: CategoriaAtividade = (
      await request(app.getHttpServer())
        .post('/api/categoria-atividades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update categoria-atividades', async () => {
    const updatedEntity: CategoriaAtividade = (
      await request(app.getHttpServer())
        .put('/api/categoria-atividades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE categoria-atividades', async () => {
    const deletedEntity: CategoriaAtividade = (
      await request(app.getHttpServer())
        .delete('/api/categoria-atividades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
