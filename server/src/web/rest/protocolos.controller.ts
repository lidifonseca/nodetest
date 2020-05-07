import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Protocolos from '../../domain/protocolos.entity';
import { ProtocolosService } from '../../service/protocolos.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/protocolos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('protocolos')
export class ProtocolosController {
  logger = new Logger('ProtocolosController');

  constructor(private readonly protocolosService: ProtocolosService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Protocolos
  })
  async getAll(@Req() req: Request): Promise<Protocolos[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.protocolosService.findAndCount(
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
    type: Protocolos
  })
  async getOne(@Param('id') id: string): Promise<Protocolos> {
    return await this.protocolosService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create protocolos' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Protocolos
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() protocolos: Protocolos): Promise<Protocolos> {
    console.info(protocolos);
    const created = await this.protocolosService.save(protocolos);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Protocolos', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update protocolos' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Protocolos
  })
  async put(@Req() req: Request, @Body() protocolos: Protocolos): Promise<Protocolos> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Protocolos', protocolos.id);

    return await this.protocolosService.update(protocolos);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete protocolos' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Protocolos> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Protocolos', id);
    const toDelete = await this.protocolosService.findById(id);
    return await this.protocolosService.delete(toDelete);
  }
}
