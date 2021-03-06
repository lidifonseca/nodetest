import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoAcompanhamentoPush from '../../domain/atendimento-acompanhamento-push.entity';
import { AtendimentoAcompanhamentoPushService } from '../../service/atendimento-acompanhamento-push.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-acompanhamento-pushes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-acompanhamento-pushes')
export class AtendimentoAcompanhamentoPushController {
  logger = new Logger('AtendimentoAcompanhamentoPushController');

  constructor(private readonly atendimentoAcompanhamentoPushService: AtendimentoAcompanhamentoPushService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoAcompanhamentoPush
  })
  async getAll(@Req() req: Request): Promise<AtendimentoAcompanhamentoPush[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoAcompanhamentoPushService.findAndCount(
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
    type: AtendimentoAcompanhamentoPush
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoAcompanhamentoPush> {
    return await this.atendimentoAcompanhamentoPushService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoAcompanhamentoPush' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoAcompanhamentoPush
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() atendimentoAcompanhamentoPush: AtendimentoAcompanhamentoPush
  ): Promise<AtendimentoAcompanhamentoPush> {
    console.info(atendimentoAcompanhamentoPush);
    const created = await this.atendimentoAcompanhamentoPushService.save(atendimentoAcompanhamentoPush);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoAcompanhamentoPush', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoAcompanhamentoPush' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoAcompanhamentoPush
  })
  async put(
    @Req() req: Request,
    @Body() atendimentoAcompanhamentoPush: AtendimentoAcompanhamentoPush
  ): Promise<AtendimentoAcompanhamentoPush> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoAcompanhamentoPush', atendimentoAcompanhamentoPush.id);

    return await this.atendimentoAcompanhamentoPushService.update(atendimentoAcompanhamentoPush);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoAcompanhamentoPush' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoAcompanhamentoPush> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoAcompanhamentoPush', id);
    const toDelete = await this.atendimentoAcompanhamentoPushService.findById(id);
    return await this.atendimentoAcompanhamentoPushService.delete(toDelete);
  }
}
