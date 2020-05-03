import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacientePush from '../../domain/paciente-push.entity';
import { PacientePushService } from '../../service/paciente-push.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-pushes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-pushes')
export class PacientePushController {
  logger = new Logger('PacientePushController');

  constructor(private readonly pacientePushService: PacientePushService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacientePush
  })
  async getAll(@Req() req: Request): Promise<PacientePush[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacientePushService.findAndCount(
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
    type: PacientePush
  })
  async getOne(@Param('id') id: string): Promise<PacientePush> {
    return await this.pacientePushService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacientePush' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacientePush
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacientePush: PacientePush): Promise<PacientePush> {
    const created = await this.pacientePushService.save(pacientePush);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacientePush', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacientePush' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacientePush
  })
  async put(@Req() req: Request, @Body() pacientePush: PacientePush): Promise<PacientePush> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacientePush', pacientePush.id);
    return await this.pacientePushService.update(pacientePush);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacientePush' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacientePush> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacientePush', id);
    const toDelete = await this.pacientePushService.findById(id);
    return await this.pacientePushService.delete(toDelete);
  }
}
