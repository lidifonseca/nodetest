import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Cidade from '../../domain/cidade.entity';
import { CidadeService } from '../../service/cidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cidades')
export class CidadeController {
  logger = new Logger('CidadeController');

  constructor(private readonly cidadeService: CidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Cidade
  })
  async getAll(@Req() req: Request): Promise<Cidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cidadeService.findAndCount(
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
    type: Cidade
  })
  async getOne(@Param('id') id: string): Promise<Cidade> {
    return await this.cidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Cidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cidade: Cidade): Promise<Cidade> {
    const created = await this.cidadeService.save(cidade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Cidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Cidade
  })
  async put(@Req() req: Request, @Body() cidade: Cidade): Promise<Cidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Cidade', cidade.id);
    return await this.cidadeService.update(cidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Cidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Cidade', id);
    const toDelete = await this.cidadeService.findById(id);
    return await this.cidadeService.delete(toDelete);
  }
}
