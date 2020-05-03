import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Atividades from '../../domain/atividades.entity';
import { AtividadesService } from '../../service/atividades.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atividades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atividades')
export class AtividadesController {
  logger = new Logger('AtividadesController');

  constructor(private readonly atividadesService: AtividadesService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Atividades
  })
  async getAll(@Req() req: Request): Promise<Atividades[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atividadesService.findAndCount(
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
    type: Atividades
  })
  async getOne(@Param('id') id: string): Promise<Atividades> {
    return await this.atividadesService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atividades' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Atividades
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atividades: Atividades): Promise<Atividades> {
    const created = await this.atividadesService.save(atividades);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Atividades', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atividades' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Atividades
  })
  async put(@Req() req: Request, @Body() atividades: Atividades): Promise<Atividades> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Atividades', atividades.id);
    return await this.atividadesService.update(atividades);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atividades' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Atividades> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Atividades', id);
    const toDelete = await this.atividadesService.findById(id);
    return await this.atividadesService.delete(toDelete);
  }
}
