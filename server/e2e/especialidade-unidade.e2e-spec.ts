import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import EspecialidadeUnidade from '../src/domain/especialidade-unidade.entity';
import { EspecialidadeUnidadeService } from '../src/service/especialidade-unidade.service';

describe('EspecialidadeUnidade Controller', () => {
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
      .overrideProvider(EspecialidadeUnidadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all especialidade-unidades ', async () => {
    const getEntities: EspecialidadeUnidade[] = (
      await request(app.getHttpServer())
        .get('/api/especialidade-unidades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET especialidade-unidades by id', async () => {
    const getEntity: EspecialidadeUnidade = (
      await request(app.getHttpServer())
        .get('/api/especialidade-unidades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create especialidade-unidades', async () => {
    const createdEntity: EspecialidadeUnidade = (
      await request(app.getHttpServer())
        .post('/api/especialidade-unidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update especialidade-unidades', async () => {
    const updatedEntity: EspecialidadeUnidade = (
      await request(app.getHttpServer())
        .put('/api/especialidade-unidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE especialidade-unidades', async () => {
    const deletedEntity: EspecialidadeUnidade = (
      await request(app.getHttpServer())
        .delete('/api/especialidade-unidades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
