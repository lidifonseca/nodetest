import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Audiencia from '../../domain/audiencia.entity';
import { AudienciaService } from '../../service/audiencia.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/audiencias')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('audiencias')
export class AudienciaController {
  logger = new Logger('AudienciaController');

  constructor(private readonly audienciaService: AudienciaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Audiencia
  })
  async getAll(@Req() req: Request): Promise<Audiencia[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.audienciaService.findAndCount({
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
    type: Audiencia
  })
  async getOne(@Param('id') id: string): Promise<Audiencia> {
    return await this.audienciaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create audiencia' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Audiencia
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() audiencia: Audiencia): Promise<Audiencia> {
    const created = await this.audienciaService.save(audiencia);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Audiencia', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update audiencia' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Audiencia
  })
  async put(@Req() req: Request, @Body() audiencia: Audiencia): Promise<Audiencia> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Audiencia', audiencia.id);
    return await this.audienciaService.update(audiencia);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete audiencia' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Audiencia> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Audiencia', id);
    const toDelete = await this.audienciaService.findById(id);
    return await this.audienciaService.delete(toDelete);
  }
}
