import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Estado from '../../domain/estado.entity';
import { EstadoService } from '../../service/estado.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/estados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('estados')
export class EstadoController {
  logger = new Logger('EstadoController');

  constructor(private readonly estadoService: EstadoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Estado
  })
  async getAll(@Req() req: Request): Promise<Estado[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.estadoService.findAndCount({
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
    type: Estado
  })
  async getOne(@Param('id') id: string): Promise<Estado> {
    return await this.estadoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create estado' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Estado
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() estado: Estado): Promise<Estado> {
    const created = await this.estadoService.save(estado);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Estado', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update estado' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Estado
  })
  async put(@Req() req: Request, @Body() estado: Estado): Promise<Estado> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Estado', estado.id);
    return await this.estadoService.update(estado);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete estado' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Estado> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Estado', id);
    const toDelete = await this.estadoService.findById(id);
    return await this.estadoService.delete(toDelete);
  }
}
