import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import StatusFinanceiro from '../../domain/status-financeiro.entity';
import { StatusFinanceiroService } from '../../service/status-financeiro.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/status-financeiros')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('status-financeiros')
export class StatusFinanceiroController {
  logger = new Logger('StatusFinanceiroController');

  constructor(private readonly statusFinanceiroService: StatusFinanceiroService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StatusFinanceiro
  })
  async getAll(@Req() req: Request): Promise<StatusFinanceiro[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.statusFinanceiroService.findAndCount(
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
    type: StatusFinanceiro
  })
  async getOne(@Param('id') id: string): Promise<StatusFinanceiro> {
    return await this.statusFinanceiroService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create statusFinanceiro' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StatusFinanceiro
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() statusFinanceiro: StatusFinanceiro): Promise<StatusFinanceiro> {
    const created = await this.statusFinanceiroService.save(statusFinanceiro);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusFinanceiro', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update statusFinanceiro' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StatusFinanceiro
  })
  async put(@Req() req: Request, @Body() statusFinanceiro: StatusFinanceiro): Promise<StatusFinanceiro> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusFinanceiro', statusFinanceiro.id);
    return await this.statusFinanceiroService.update(statusFinanceiro);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete statusFinanceiro' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<StatusFinanceiro> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'StatusFinanceiro', id);
    const toDelete = await this.statusFinanceiroService.findById(id);
    return await this.statusFinanceiroService.delete(toDelete);
  }
}
