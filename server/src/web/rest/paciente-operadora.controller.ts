import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteOperadora from '../../domain/paciente-operadora.entity';
import { PacienteOperadoraService } from '../../service/paciente-operadora.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-operadoras')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-operadoras')
export class PacienteOperadoraController {
  logger = new Logger('PacienteOperadoraController');

  constructor(private readonly pacienteOperadoraService: PacienteOperadoraService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteOperadora
  })
  async getAll(@Req() req: Request): Promise<PacienteOperadora[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteOperadoraService.findAndCount(
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
    type: PacienteOperadora
  })
  async getOne(@Param('id') id: string): Promise<PacienteOperadora> {
    return await this.pacienteOperadoraService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteOperadora' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteOperadora
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteOperadora: PacienteOperadora): Promise<PacienteOperadora> {
    const created = await this.pacienteOperadoraService.save(pacienteOperadora);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteOperadora', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteOperadora' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteOperadora
  })
  async put(@Req() req: Request, @Body() pacienteOperadora: PacienteOperadora): Promise<PacienteOperadora> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteOperadora', pacienteOperadora.id);
    return await this.pacienteOperadoraService.update(pacienteOperadora);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteOperadora' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteOperadora> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteOperadora', id);
    const toDelete = await this.pacienteOperadoraService.findById(id);
    return await this.pacienteOperadoraService.delete(toDelete);
  }
}
