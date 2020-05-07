import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import StatusAtendimento from '../../domain/status-atendimento.entity';
import { StatusAtendimentoService } from '../../service/status-atendimento.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/status-atendimentos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('status-atendimentos')
export class StatusAtendimentoController {
  logger = new Logger('StatusAtendimentoController');

  constructor(private readonly statusAtendimentoService: StatusAtendimentoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StatusAtendimento
  })
  async getAll(@Req() req: Request): Promise<StatusAtendimento[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.statusAtendimentoService.findAndCount(
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
    type: StatusAtendimento
  })
  async getOne(@Param('id') id: string): Promise<StatusAtendimento> {
    return await this.statusAtendimentoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create statusAtendimento' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StatusAtendimento
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() statusAtendimento: StatusAtendimento): Promise<StatusAtendimento> {
    console.info(statusAtendimento);
    const created = await this.statusAtendimentoService.save(statusAtendimento);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusAtendimento', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update statusAtendimento' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StatusAtendimento
  })
  async put(@Req() req: Request, @Body() statusAtendimento: StatusAtendimento): Promise<StatusAtendimento> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusAtendimento', statusAtendimento.id);

    return await this.statusAtendimentoService.update(statusAtendimento);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete statusAtendimento' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<StatusAtendimento> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'StatusAtendimento', id);
    const toDelete = await this.statusAtendimentoService.findById(id);
    return await this.statusAtendimentoService.delete(toDelete);
  }
}
