import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteDispositivoComplexidade from '../../domain/paciente-dispositivo-complexidade.entity';
import { PacienteDispositivoComplexidadeService } from '../../service/paciente-dispositivo-complexidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-dispositivo-complexidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-dispositivo-complexidades')
export class PacienteDispositivoComplexidadeController {
  logger = new Logger('PacienteDispositivoComplexidadeController');

  constructor(private readonly pacienteDispositivoComplexidadeService: PacienteDispositivoComplexidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteDispositivoComplexidade
  })
  async getAll(@Req() req: Request): Promise<PacienteDispositivoComplexidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteDispositivoComplexidadeService.findAndCount(
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
    type: PacienteDispositivoComplexidade
  })
  async getOne(@Param('id') id: string): Promise<PacienteDispositivoComplexidade> {
    return await this.pacienteDispositivoComplexidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteDispositivoComplexidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteDispositivoComplexidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() pacienteDispositivoComplexidade: PacienteDispositivoComplexidade
  ): Promise<PacienteDispositivoComplexidade> {
    const created = await this.pacienteDispositivoComplexidadeService.save(pacienteDispositivoComplexidade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDispositivoComplexidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteDispositivoComplexidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteDispositivoComplexidade
  })
  async put(
    @Req() req: Request,
    @Body() pacienteDispositivoComplexidade: PacienteDispositivoComplexidade
  ): Promise<PacienteDispositivoComplexidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDispositivoComplexidade', pacienteDispositivoComplexidade.id);
    return await this.pacienteDispositivoComplexidadeService.update(pacienteDispositivoComplexidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteDispositivoComplexidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteDispositivoComplexidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteDispositivoComplexidade', id);
    const toDelete = await this.pacienteDispositivoComplexidadeService.findById(id);
    return await this.pacienteDispositivoComplexidadeService.delete(toDelete);
  }
}
