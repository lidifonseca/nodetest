import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalPush from '../../domain/profissional-push.entity';
import { ProfissionalPushService } from '../../service/profissional-push.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-pushes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-pushes')
export class ProfissionalPushController {
  logger = new Logger('ProfissionalPushController');

  constructor(private readonly profissionalPushService: ProfissionalPushService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalPush
  })
  async getAll(@Req() req: Request): Promise<ProfissionalPush[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalPushService.findAndCount(
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
    type: ProfissionalPush
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalPush> {
    return await this.profissionalPushService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalPush' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalPush
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalPush: ProfissionalPush): Promise<ProfissionalPush> {
    console.info(profissionalPush);
    const created = await this.profissionalPushService.save(profissionalPush);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalPush', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalPush' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalPush
  })
  async put(@Req() req: Request, @Body() profissionalPush: ProfissionalPush): Promise<ProfissionalPush> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalPush', profissionalPush.id);

    return await this.profissionalPushService.update(profissionalPush);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalPush' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalPush> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalPush', id);
    const toDelete = await this.profissionalPushService.findById(id);
    return await this.profissionalPushService.delete(toDelete);
  }
}
