import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteProntuario from '../../domain/paciente-prontuario.entity';
import { PacienteProntuarioService } from '../../service/paciente-prontuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-prontuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-prontuarios')
export class PacienteProntuarioController {
  logger = new Logger('PacienteProntuarioController');

  constructor(private readonly pacienteProntuarioService: PacienteProntuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteProntuario
  })
  async getAll(@Req() req: Request): Promise<PacienteProntuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteProntuarioService.findAndCount(
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
    type: PacienteProntuario
  })
  async getOne(@Param('id') id: string): Promise<PacienteProntuario> {
    return await this.pacienteProntuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteProntuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteProntuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteProntuario: PacienteProntuario): Promise<PacienteProntuario> {
    const created = await this.pacienteProntuarioService.save(pacienteProntuario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteProntuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteProntuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteProntuario
  })
  async put(@Req() req: Request, @Body() pacienteProntuario: PacienteProntuario): Promise<PacienteProntuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteProntuario', pacienteProntuario.id);
    return await this.pacienteProntuarioService.update(pacienteProntuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteProntuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteProntuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteProntuario', id);
    const toDelete = await this.pacienteProntuarioService.findById(id);
    return await this.pacienteProntuarioService.delete(toDelete);
  }
}
