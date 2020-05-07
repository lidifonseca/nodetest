import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Diario from '../../domain/diario.entity';
import { DiarioService } from '../../service/diario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/diarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('diarios')
export class DiarioController {
  logger = new Logger('DiarioController');

  constructor(private readonly diarioService: DiarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Diario
  })
  async getAll(@Req() req: Request): Promise<Diario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.diarioService.findAndCount(
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
    type: Diario
  })
  async getOne(@Param('id') id: string): Promise<Diario> {
    return await this.diarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create diario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Diario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() diario: Diario): Promise<Diario> {
    console.info(diario);
    const created = await this.diarioService.save(diario);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Diario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update diario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Diario
  })
  async put(@Req() req: Request, @Body() diario: Diario): Promise<Diario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Diario', diario.id);

    return await this.diarioService.update(diario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete diario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Diario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Diario', id);
    const toDelete = await this.diarioService.findById(id);
    return await this.diarioService.delete(toDelete);
  }
}
