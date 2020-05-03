import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalFranquia from '../src/domain/profissional-franquia.entity';
import { ProfissionalFranquiaService } from '../src/service/profissional-franquia.service';

describe('ProfissionalFranquia Controller', () => {
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
      .overrideProvider(ProfissionalFranquiaService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-franquias ', async () => {
    const getEntities: ProfissionalFranquia[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-franquias')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-franquias by id', async () => {
    const getEntity: ProfissionalFranquia = (
      await request(app.getHttpServer())
        .get('/api/profissional-franquias/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-franquias', async () => {
    const createdEntity: ProfissionalFranquia = (
      await request(app.getHttpServer())
        .post('/api/profissional-franquias')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-franquias', async () => {
    const updatedEntity: ProfissionalFranquia = (
      await request(app.getHttpServer())
        .put('/api/profissional-franquias')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-franquias', async () => {
    const deletedEntity: ProfissionalFranquia = (
      await request(app.getHttpServer())
        .delete('/api/profissional-franquias/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
