import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Respostas from '../../domain/respostas.entity';
import { RespostasService } from '../../service/respostas.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/respostas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('respostas')
export class RespostasController {
  logger = new Logger('RespostasController');

  constructor(private readonly respostasService: RespostasService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Respostas
  })
  async getAll(@Req() req: Request): Promise<Respostas[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.respostasService.findAndCount(
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
    type: Respostas
  })
  async getOne(@Param('id') id: string): Promise<Respostas> {
    return await this.respostasService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create respostas' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Respostas
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() respostas: Respostas): Promise<Respostas> {
    const created = await this.respostasService.save(respostas);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Respostas', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update respostas' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Respostas
  })
  async put(@Req() req: Request, @Body() respostas: Respostas): Promise<Respostas> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Respostas', respostas.id);
    return await this.respostasService.update(respostas);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete respostas' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Respostas> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Respostas', id);
    const toDelete = await this.respostasService.findById(id);
    return await this.respostasService.delete(toDelete);
  }
}
