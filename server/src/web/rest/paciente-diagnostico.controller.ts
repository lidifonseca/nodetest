import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteDiagnostico from '../../domain/paciente-diagnostico.entity';
import { PacienteDiagnosticoService } from '../../service/paciente-diagnostico.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-diagnosticos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-diagnosticos')
export class PacienteDiagnosticoController {
  logger = new Logger('PacienteDiagnosticoController');

  constructor(private readonly pacienteDiagnosticoService: PacienteDiagnosticoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteDiagnostico
  })
  async getAll(@Req() req: Request): Promise<PacienteDiagnostico[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteDiagnosticoService.findAndCount(
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
    type: PacienteDiagnostico
  })
  async getOne(@Param('id') id: string): Promise<PacienteDiagnostico> {
    return await this.pacienteDiagnosticoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteDiagnostico' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteDiagnostico
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteDiagnostico: PacienteDiagnostico): Promise<PacienteDiagnostico> {
    console.info(pacienteDiagnostico);
    const created = await this.pacienteDiagnosticoService.save(pacienteDiagnostico);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDiagnostico', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteDiagnostico' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteDiagnostico
  })
  async put(@Req() req: Request, @Body() pacienteDiagnostico: PacienteDiagnostico): Promise<PacienteDiagnostico> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDiagnostico', pacienteDiagnostico.id);

    return await this.pacienteDiagnosticoService.update(pacienteDiagnostico);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteDiagnostico' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteDiagnostico> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteDiagnostico', id);
    const toDelete = await this.pacienteDiagnosticoService.findById(id);
    return await this.pacienteDiagnosticoService.delete(toDelete);
  }
}
