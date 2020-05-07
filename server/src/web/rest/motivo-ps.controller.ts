import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import MotivoPs from '../../domain/motivo-ps.entity';
import { MotivoPsService } from '../../service/motivo-ps.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/motivo-ps')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('motivo-ps')
export class MotivoPsController {
  logger = new Logger('MotivoPsController');

  constructor(private readonly motivoPsService: MotivoPsService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: MotivoPs
  })
  async getAll(@Req() req: Request): Promise<MotivoPs[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.motivoPsService.findAndCount(
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
    type: MotivoPs
  })
  async getOne(@Param('id') id: string): Promise<MotivoPs> {
    return await this.motivoPsService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create motivoPs' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MotivoPs
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() motivoPs: MotivoPs): Promise<MotivoPs> {
    console.info(motivoPs);
    const created = await this.motivoPsService.save(motivoPs);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MotivoPs', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update motivoPs' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: MotivoPs
  })
  async put(@Req() req: Request, @Body() motivoPs: MotivoPs): Promise<MotivoPs> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MotivoPs', motivoPs.id);

    return await this.motivoPsService.update(motivoPs);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete motivoPs' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<MotivoPs> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'MotivoPs', id);
    const toDelete = await this.motivoPsService.findById(id);
    return await this.motivoPsService.delete(toDelete);
  }
}
