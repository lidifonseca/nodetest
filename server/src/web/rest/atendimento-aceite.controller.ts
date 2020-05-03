import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoAceite from '../../domain/atendimento-aceite.entity';
import { AtendimentoAceiteService } from '../../service/atendimento-aceite.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-aceites')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-aceites')
export class AtendimentoAceiteController {
  logger = new Logger('AtendimentoAceiteController');

  constructor(private readonly atendimentoAceiteService: AtendimentoAceiteService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoAceite
  })
  async getAll(@Req() req: Request): Promise<AtendimentoAceite[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoAceiteService.findAndCount(
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
    type: AtendimentoAceite
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoAceite> {
    return await this.atendimentoAceiteService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoAceite' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoAceite
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimentoAceite: AtendimentoAceite): Promise<AtendimentoAceite> {
    const created = await this.atendimentoAceiteService.save(atendimentoAceite);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoAceite', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoAceite' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoAceite
  })
  async put(@Req() req: Request, @Body() atendimentoAceite: AtendimentoAceite): Promise<AtendimentoAceite> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoAceite', atendimentoAceite.id);
    return await this.atendimentoAceiteService.update(atendimentoAceite);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoAceite' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoAceite> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoAceite', id);
    const toDelete = await this.atendimentoAceiteService.findById(id);
    return await this.atendimentoAceiteService.delete(toDelete);
  }
}
