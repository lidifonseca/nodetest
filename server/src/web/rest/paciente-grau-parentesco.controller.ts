import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteGrauParentesco from '../../domain/paciente-grau-parentesco.entity';
import { PacienteGrauParentescoService } from '../../service/paciente-grau-parentesco.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-grau-parentescos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-grau-parentescos')
export class PacienteGrauParentescoController {
  logger = new Logger('PacienteGrauParentescoController');

  constructor(private readonly pacienteGrauParentescoService: PacienteGrauParentescoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteGrauParentesco
  })
  async getAll(@Req() req: Request): Promise<PacienteGrauParentesco[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteGrauParentescoService.findAndCount(
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
    type: PacienteGrauParentesco
  })
  async getOne(@Param('id') id: string): Promise<PacienteGrauParentesco> {
    return await this.pacienteGrauParentescoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteGrauParentesco' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteGrauParentesco
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteGrauParentesco: PacienteGrauParentesco): Promise<PacienteGrauParentesco> {
    const created = await this.pacienteGrauParentescoService.save(pacienteGrauParentesco);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteGrauParentesco', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteGrauParentesco' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteGrauParentesco
  })
  async put(@Req() req: Request, @Body() pacienteGrauParentesco: PacienteGrauParentesco): Promise<PacienteGrauParentesco> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteGrauParentesco', pacienteGrauParentesco.id);
    return await this.pacienteGrauParentescoService.update(pacienteGrauParentesco);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteGrauParentesco' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteGrauParentesco> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteGrauParentesco', id);
    const toDelete = await this.pacienteGrauParentescoService.findById(id);
    return await this.pacienteGrauParentescoService.delete(toDelete);
  }
}
