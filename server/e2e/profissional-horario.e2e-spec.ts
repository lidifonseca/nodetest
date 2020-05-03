import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalHorario from '../src/domain/profissional-horario.entity';
import { ProfissionalHorarioService } from '../src/service/profissional-horario.service';

describe('ProfissionalHorario Controller', () => {
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
      .overrideProvider(ProfissionalHorarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-horarios ', async () => {
    const getEntities: ProfissionalHorario[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-horarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-horarios by id', async () => {
    const getEntity: ProfissionalHorario = (
      await request(app.getHttpServer())
        .get('/api/profissional-horarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-horarios', async () => {
    const createdEntity: ProfissionalHorario = (
      await request(app.getHttpServer())
        .post('/api/profissional-horarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-horarios', async () => {
    const updatedEntity: ProfissionalHorario = (
      await request(app.getHttpServer())
        .put('/api/profissional-horarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-horarios', async () => {
    const deletedEntity: ProfissionalHorario = (
      await request(app.getHttpServer())
        .delete('/api/profissional-horarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
