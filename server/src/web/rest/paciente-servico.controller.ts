import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteServico from '../../domain/paciente-servico.entity';
import { PacienteServicoService } from '../../service/paciente-servico.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-servicos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-servicos')
export class PacienteServicoController {
  logger = new Logger('PacienteServicoController');

  constructor(private readonly pacienteServicoService: PacienteServicoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteServico
  })
  async getAll(@Req() req: Request): Promise<PacienteServico[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteServicoService.findAndCount(
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
    type: PacienteServico
  })
  async getOne(@Param('id') id: string): Promise<PacienteServico> {
    return await this.pacienteServicoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteServico' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteServico
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteServico: PacienteServico): Promise<PacienteServico> {
    console.info(pacienteServico);
    const created = await this.pacienteServicoService.save(pacienteServico);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteServico', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteServico' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteServico
  })
  async put(@Req() req: Request, @Body() pacienteServico: PacienteServico): Promise<PacienteServico> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteServico', pacienteServico.id);

    return await this.pacienteServicoService.update(pacienteServico);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteServico' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteServico> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteServico', id);
    const toDelete = await this.pacienteServicoService.findById(id);
    return await this.pacienteServicoService.delete(toDelete);
  }
}
