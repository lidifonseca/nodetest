import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoCepRecusado from '../../domain/atendimento-cep-recusado.entity';
import { AtendimentoCepRecusadoService } from '../../service/atendimento-cep-recusado.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-cep-recusados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-cep-recusados')
export class AtendimentoCepRecusadoController {
  logger = new Logger('AtendimentoCepRecusadoController');

  constructor(private readonly atendimentoCepRecusadoService: AtendimentoCepRecusadoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoCepRecusado
  })
  async getAll(@Req() req: Request): Promise<AtendimentoCepRecusado[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoCepRecusadoService.findAndCount(
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
    type: AtendimentoCepRecusado
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoCepRecusado> {
    return await this.atendimentoCepRecusadoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoCepRecusado' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoCepRecusado
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimentoCepRecusado: AtendimentoCepRecusado): Promise<AtendimentoCepRecusado> {
    const created = await this.atendimentoCepRecusadoService.save(atendimentoCepRecusado);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoCepRecusado', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoCepRecusado' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoCepRecusado
  })
  async put(@Req() req: Request, @Body() atendimentoCepRecusado: AtendimentoCepRecusado): Promise<AtendimentoCepRecusado> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoCepRecusado', atendimentoCepRecusado.id);
    return await this.atendimentoCepRecusadoService.update(atendimentoCepRecusado);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoCepRecusado' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoCepRecusado> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoCepRecusado', id);
    const toDelete = await this.atendimentoCepRecusadoService.findById(id);
    return await this.atendimentoCepRecusadoService.delete(toDelete);
  }
}
