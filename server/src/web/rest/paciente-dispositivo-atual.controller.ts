import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteDispositivoAtual from '../../domain/paciente-dispositivo-atual.entity';
import { PacienteDispositivoAtualService } from '../../service/paciente-dispositivo-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-dispositivo-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-dispositivo-atuals')
export class PacienteDispositivoAtualController {
  logger = new Logger('PacienteDispositivoAtualController');

  constructor(private readonly pacienteDispositivoAtualService: PacienteDispositivoAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteDispositivoAtual
  })
  async getAll(@Req() req: Request): Promise<PacienteDispositivoAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteDispositivoAtualService.findAndCount(
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
    type: PacienteDispositivoAtual
  })
  async getOne(@Param('id') id: string): Promise<PacienteDispositivoAtual> {
    return await this.pacienteDispositivoAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteDispositivoAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteDispositivoAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteDispositivoAtual: PacienteDispositivoAtual): Promise<PacienteDispositivoAtual> {
    console.info(pacienteDispositivoAtual);
    const created = await this.pacienteDispositivoAtualService.save(pacienteDispositivoAtual);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDispositivoAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteDispositivoAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteDispositivoAtual
  })
  async put(@Req() req: Request, @Body() pacienteDispositivoAtual: PacienteDispositivoAtual): Promise<PacienteDispositivoAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDispositivoAtual', pacienteDispositivoAtual.id);

    return await this.pacienteDispositivoAtualService.update(pacienteDispositivoAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteDispositivoAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteDispositivoAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteDispositivoAtual', id);
    const toDelete = await this.pacienteDispositivoAtualService.findById(id);
    return await this.pacienteDispositivoAtualService.delete(toDelete);
  }
}
