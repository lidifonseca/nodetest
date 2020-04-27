import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import HistoricoClase from '../../domain/historico-clase.entity';
import { HistoricoClaseService } from '../../service/historico-clase.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/historico-clases')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('historico-clases')
export class HistoricoClaseController {
  logger = new Logger('HistoricoClaseController');

  constructor(private readonly historicoClaseService: HistoricoClaseService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: HistoricoClase
  })
  async getAll(@Req() req: Request): Promise<HistoricoClase[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.historicoClaseService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: HistoricoClase
  })
  async getOne(@Param('id') id: string): Promise<HistoricoClase> {
    return await this.historicoClaseService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create historicoClase' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: HistoricoClase
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() historicoClase: HistoricoClase): Promise<HistoricoClase> {
    const created = await this.historicoClaseService.save(historicoClase);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'HistoricoClase', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update historicoClase' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: HistoricoClase
  })
  async put(@Req() req: Request, @Body() historicoClase: HistoricoClase): Promise<HistoricoClase> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'HistoricoClase', historicoClase.id);
    return await this.historicoClaseService.update(historicoClase);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete historicoClase' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<HistoricoClase> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'HistoricoClase', id);
    const toDelete = await this.historicoClaseService.findById(id);
    return await this.historicoClaseService.delete(toDelete);
  }
}
