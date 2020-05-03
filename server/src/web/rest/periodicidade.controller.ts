import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Periodicidade from '../../domain/periodicidade.entity';
import { PeriodicidadeService } from '../../service/periodicidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/periodicidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('periodicidades')
export class PeriodicidadeController {
  logger = new Logger('PeriodicidadeController');

  constructor(private readonly periodicidadeService: PeriodicidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Periodicidade
  })
  async getAll(@Req() req: Request): Promise<Periodicidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.periodicidadeService.findAndCount(
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
    type: Periodicidade
  })
  async getOne(@Param('id') id: string): Promise<Periodicidade> {
    return await this.periodicidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create periodicidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Periodicidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() periodicidade: Periodicidade): Promise<Periodicidade> {
    const created = await this.periodicidadeService.save(periodicidade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Periodicidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update periodicidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Periodicidade
  })
  async put(@Req() req: Request, @Body() periodicidade: Periodicidade): Promise<Periodicidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Periodicidade', periodicidade.id);
    return await this.periodicidadeService.update(periodicidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete periodicidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Periodicidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Periodicidade', id);
    const toDelete = await this.periodicidadeService.findById(id);
    return await this.periodicidadeService.delete(toDelete);
  }
}
