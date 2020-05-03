import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import LogUserFranquia from '../src/domain/log-user-franquia.entity';
import { LogUserFranquiaService } from '../src/service/log-user-franquia.service';

describe('LogUserFranquia Controller', () => {
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
      .overrideProvider(LogUserFranquiaService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all log-user-franquias ', async () => {
    const getEntities: LogUserFranquia[] = (
      await request(app.getHttpServer())
        .get('/api/log-user-franquias')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET log-user-franquias by id', async () => {
    const getEntity: LogUserFranquia = (
      await request(app.getHttpServer())
        .get('/api/log-user-franquias/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create log-user-franquias', async () => {
    const createdEntity: LogUserFranquia = (
      await request(app.getHttpServer())
        .post('/api/log-user-franquias')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update log-user-franquias', async () => {
    const updatedEntity: LogUserFranquia = (
      await request(app.getHttpServer())
        .put('/api/log-user-franquias')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE log-user-franquias', async () => {
    const deletedEntity: LogUserFranquia = (
      await request(app.getHttpServer())
        .delete('/api/log-user-franquias/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
