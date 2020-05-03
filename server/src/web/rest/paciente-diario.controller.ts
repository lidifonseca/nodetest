import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteDiario from '../../domain/paciente-diario.entity';
import { PacienteDiarioService } from '../../service/paciente-diario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-diarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-diarios')
export class PacienteDiarioController {
  logger = new Logger('PacienteDiarioController');

  constructor(private readonly pacienteDiarioService: PacienteDiarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteDiario
  })
  async getAll(@Req() req: Request): Promise<PacienteDiario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteDiarioService.findAndCount(
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
    type: PacienteDiario
  })
  async getOne(@Param('id') id: string): Promise<PacienteDiario> {
    return await this.pacienteDiarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteDiario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteDiario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteDiario: PacienteDiario): Promise<PacienteDiario> {
    const created = await this.pacienteDiarioService.save(pacienteDiario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDiario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteDiario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteDiario
  })
  async put(@Req() req: Request, @Body() pacienteDiario: PacienteDiario): Promise<PacienteDiario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDiario', pacienteDiario.id);
    return await this.pacienteDiarioService.update(pacienteDiario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteDiario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteDiario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteDiario', id);
    const toDelete = await this.pacienteDiarioService.findById(id);
    return await this.pacienteDiarioService.delete(toDelete);
  }
}
