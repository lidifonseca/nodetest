import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteStatusAtual from '../../domain/paciente-status-atual.entity';
import { PacienteStatusAtualService } from '../../service/paciente-status-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-status-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-status-atuals')
export class PacienteStatusAtualController {
  logger = new Logger('PacienteStatusAtualController');

  constructor(private readonly pacienteStatusAtualService: PacienteStatusAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteStatusAtual
  })
  async getAll(@Req() req: Request): Promise<PacienteStatusAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteStatusAtualService.findAndCount(
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
    type: PacienteStatusAtual
  })
  async getOne(@Param('id') id: string): Promise<PacienteStatusAtual> {
    return await this.pacienteStatusAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteStatusAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteStatusAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteStatusAtual: PacienteStatusAtual): Promise<PacienteStatusAtual> {
    const created = await this.pacienteStatusAtualService.save(pacienteStatusAtual);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteStatusAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteStatusAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteStatusAtual
  })
  async put(@Req() req: Request, @Body() pacienteStatusAtual: PacienteStatusAtual): Promise<PacienteStatusAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteStatusAtual', pacienteStatusAtual.id);
    return await this.pacienteStatusAtualService.update(pacienteStatusAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteStatusAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteStatusAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteStatusAtual', id);
    const toDelete = await this.pacienteStatusAtualService.findById(id);
    return await this.pacienteStatusAtualService.delete(toDelete);
  }
}
