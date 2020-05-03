import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import StatusAtualProf from '../src/domain/status-atual-prof.entity';
import { StatusAtualProfService } from '../src/service/status-atual-prof.service';

describe('StatusAtualProf Controller', () => {
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
      .overrideProvider(StatusAtualProfService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all status-atual-profs ', async () => {
    const getEntities: StatusAtualProf[] = (
      await request(app.getHttpServer())
        .get('/api/status-atual-profs')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET status-atual-profs by id', async () => {
    const getEntity: StatusAtualProf = (
      await request(app.getHttpServer())
        .get('/api/status-atual-profs/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create status-atual-profs', async () => {
    const createdEntity: StatusAtualProf = (
      await request(app.getHttpServer())
        .post('/api/status-atual-profs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update status-atual-profs', async () => {
    const updatedEntity: StatusAtualProf = (
      await request(app.getHttpServer())
        .put('/api/status-atual-profs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE status-atual-profs', async () => {
    const deletedEntity: StatusAtualProf = (
      await request(app.getHttpServer())
        .delete('/api/status-atual-profs/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
