import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import EspecialidadeValor from '../src/domain/especialidade-valor.entity';
import { EspecialidadeValorService } from '../src/service/especialidade-valor.service';

describe('EspecialidadeValor Controller', () => {
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
      .overrideProvider(EspecialidadeValorService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all especialidade-valors ', async () => {
    const getEntities: EspecialidadeValor[] = (
      await request(app.getHttpServer())
        .get('/api/especialidade-valors')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET especialidade-valors by id', async () => {
    const getEntity: EspecialidadeValor = (
      await request(app.getHttpServer())
        .get('/api/especialidade-valors/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create especialidade-valors', async () => {
    const createdEntity: EspecialidadeValor = (
      await request(app.getHttpServer())
        .post('/api/especialidade-valors')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update especialidade-valors', async () => {
    const updatedEntity: EspecialidadeValor = (
      await request(app.getHttpServer())
        .put('/api/especialidade-valors')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE especialidade-valors', async () => {
    const deletedEntity: EspecialidadeValor = (
      await request(app.getHttpServer())
        .delete('/api/especialidade-valors/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
