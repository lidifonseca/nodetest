import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Incidente from '../../domain/incidente.entity';
import { IncidenteService } from '../../service/incidente.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/incidentes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('incidentes')
export class IncidenteController {
  logger = new Logger('IncidenteController');

  constructor(private readonly incidenteService: IncidenteService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Incidente
  })
  async getAll(@Req() req: Request): Promise<Incidente[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.incidenteService.findAndCount({
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
    type: Incidente
  })
  async getOne(@Param('id') id: string): Promise<Incidente> {
    return await this.incidenteService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create incidente' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Incidente
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() incidente: Incidente): Promise<Incidente> {
    const created = await this.incidenteService.save(incidente);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Incidente', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update incidente' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Incidente
  })
  async put(@Req() req: Request, @Body() incidente: Incidente): Promise<Incidente> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Incidente', incidente.id);
    return await this.incidenteService.update(incidente);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete incidente' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Incidente> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Incidente', id);
    const toDelete = await this.incidenteService.findById(id);
    return await this.incidenteService.delete(toDelete);
  }
}
