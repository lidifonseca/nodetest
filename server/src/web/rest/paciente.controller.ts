import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Paciente from '../../domain/paciente.entity';
import { PacienteService } from '../../service/paciente.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pacientes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pacientes')
export class PacienteController {
  logger = new Logger('PacienteController');

  constructor(private readonly pacienteService: PacienteService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Paciente
  })
  async getAll(@Req() req: Request): Promise<Paciente[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteService.findAndCount(
      {
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder()
      },
      filters
    );
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Paciente
  })
  async getOne(@Param('id') id: string): Promise<Paciente> {
    return await this.pacienteService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create paciente' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Paciente
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() paciente: Paciente): Promise<Paciente> {
    console.info(paciente);
    const created = await this.pacienteService.save(paciente);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Paciente', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update paciente' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Paciente
  })
  async put(@Req() req: Request, @Body() paciente: Paciente): Promise<Paciente> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Paciente', paciente.id);

    return await this.pacienteService.update(paciente);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete paciente' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Paciente> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Paciente', id);
    const toDelete = await this.pacienteService.findById(id);
    return await this.pacienteService.delete(toDelete);
  }
}
