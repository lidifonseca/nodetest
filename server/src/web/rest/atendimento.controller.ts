import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Atendimento from '../../domain/atendimento.entity';
import { AtendimentoService } from '../../service/atendimento.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimentos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimentos')
export class AtendimentoController {
  logger = new Logger('AtendimentoController');

  constructor(private readonly atendimentoService: AtendimentoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Atendimento
  })
  async getAll(@Req() req: Request): Promise<Atendimento[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoService.findAndCount(
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
    type: Atendimento
  })
  async getOne(@Param('id') id: string): Promise<Atendimento> {
    return await this.atendimentoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimento' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Atendimento
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimento: Atendimento): Promise<Atendimento> {
    console.info(atendimento);
    const created = await this.atendimentoService.save(atendimento);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Atendimento', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimento' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Atendimento
  })
  async put(@Req() req: Request, @Body() atendimento: Atendimento): Promise<Atendimento> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Atendimento', atendimento.id);

    return await this.atendimentoService.update(atendimento);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimento' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Atendimento> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Atendimento', id);
    const toDelete = await this.atendimentoService.findById(id);
    return await this.atendimentoService.delete(toDelete);
  }
}
