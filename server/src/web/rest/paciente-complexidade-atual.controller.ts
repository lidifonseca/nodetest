import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteComplexidadeAtual from '../../domain/paciente-complexidade-atual.entity';
import { PacienteComplexidadeAtualService } from '../../service/paciente-complexidade-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-complexidade-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-complexidade-atuals')
export class PacienteComplexidadeAtualController {
  logger = new Logger('PacienteComplexidadeAtualController');

  constructor(private readonly pacienteComplexidadeAtualService: PacienteComplexidadeAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteComplexidadeAtual
  })
  async getAll(@Req() req: Request): Promise<PacienteComplexidadeAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteComplexidadeAtualService.findAndCount(
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
    type: PacienteComplexidadeAtual
  })
  async getOne(@Param('id') id: string): Promise<PacienteComplexidadeAtual> {
    return await this.pacienteComplexidadeAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteComplexidadeAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteComplexidadeAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteComplexidadeAtual: PacienteComplexidadeAtual): Promise<PacienteComplexidadeAtual> {
    const created = await this.pacienteComplexidadeAtualService.save(pacienteComplexidadeAtual);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteComplexidadeAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteComplexidadeAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteComplexidadeAtual
  })
  async put(@Req() req: Request, @Body() pacienteComplexidadeAtual: PacienteComplexidadeAtual): Promise<PacienteComplexidadeAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteComplexidadeAtual', pacienteComplexidadeAtual.id);
    return await this.pacienteComplexidadeAtualService.update(pacienteComplexidadeAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteComplexidadeAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteComplexidadeAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteComplexidadeAtual', id);
    const toDelete = await this.pacienteComplexidadeAtualService.findById(id);
    return await this.pacienteComplexidadeAtualService.delete(toDelete);
  }
}
