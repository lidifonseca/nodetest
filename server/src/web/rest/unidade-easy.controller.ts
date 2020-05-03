import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import UnidadeEasy from '../../domain/unidade-easy.entity';
import { UnidadeEasyService } from '../../service/unidade-easy.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/unidade-easies')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('unidade-easies')
export class UnidadeEasyController {
  logger = new Logger('UnidadeEasyController');

  constructor(private readonly unidadeEasyService: UnidadeEasyService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: UnidadeEasy
  })
  async getAll(@Req() req: Request): Promise<UnidadeEasy[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.unidadeEasyService.findAndCount(
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
    type: UnidadeEasy
  })
  async getOne(@Param('id') id: string): Promise<UnidadeEasy> {
    return await this.unidadeEasyService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create unidadeEasy' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UnidadeEasy
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() unidadeEasy: UnidadeEasy): Promise<UnidadeEasy> {
    const created = await this.unidadeEasyService.save(unidadeEasy);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UnidadeEasy', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update unidadeEasy' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UnidadeEasy
  })
  async put(@Req() req: Request, @Body() unidadeEasy: UnidadeEasy): Promise<UnidadeEasy> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UnidadeEasy', unidadeEasy.id);
    return await this.unidadeEasyService.update(unidadeEasy);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete unidadeEasy' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<UnidadeEasy> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'UnidadeEasy', id);
    const toDelete = await this.unidadeEasyService.findById(id);
    return await this.unidadeEasyService.delete(toDelete);
  }
}
