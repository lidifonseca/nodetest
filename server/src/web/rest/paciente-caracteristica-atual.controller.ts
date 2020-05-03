import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteCaracteristicaAtual from '../../domain/paciente-caracteristica-atual.entity';
import { PacienteCaracteristicaAtualService } from '../../service/paciente-caracteristica-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-caracteristica-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-caracteristica-atuals')
export class PacienteCaracteristicaAtualController {
  logger = new Logger('PacienteCaracteristicaAtualController');

  constructor(private readonly pacienteCaracteristicaAtualService: PacienteCaracteristicaAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteCaracteristicaAtual
  })
  async getAll(@Req() req: Request): Promise<PacienteCaracteristicaAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteCaracteristicaAtualService.findAndCount(
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
    type: PacienteCaracteristicaAtual
  })
  async getOne(@Param('id') id: string): Promise<PacienteCaracteristicaAtual> {
    return await this.pacienteCaracteristicaAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteCaracteristicaAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteCaracteristicaAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteCaracteristicaAtual: PacienteCaracteristicaAtual): Promise<PacienteCaracteristicaAtual> {
    const created = await this.pacienteCaracteristicaAtualService.save(pacienteCaracteristicaAtual);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteCaracteristicaAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteCaracteristicaAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteCaracteristicaAtual
  })
  async put(@Req() req: Request, @Body() pacienteCaracteristicaAtual: PacienteCaracteristicaAtual): Promise<PacienteCaracteristicaAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteCaracteristicaAtual', pacienteCaracteristicaAtual.id);
    return await this.pacienteCaracteristicaAtualService.update(pacienteCaracteristicaAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteCaracteristicaAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteCaracteristicaAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteCaracteristicaAtual', id);
    const toDelete = await this.pacienteCaracteristicaAtualService.findById(id);
    return await this.pacienteCaracteristicaAtualService.delete(toDelete);
  }
}
