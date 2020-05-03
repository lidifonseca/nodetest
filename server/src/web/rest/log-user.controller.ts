import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import LogUser from '../../domain/log-user.entity';
import { LogUserService } from '../../service/log-user.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/log-users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('log-users')
export class LogUserController {
  logger = new Logger('LogUserController');

  constructor(private readonly logUserService: LogUserService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: LogUser
  })
  async getAll(@Req() req: Request): Promise<LogUser[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.logUserService.findAndCount(
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
    type: LogUser
  })
  async getOne(@Param('id') id: string): Promise<LogUser> {
    return await this.logUserService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create logUser' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LogUser
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() logUser: LogUser): Promise<LogUser> {
    const created = await this.logUserService.save(logUser);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LogUser', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update logUser' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: LogUser
  })
  async put(@Req() req: Request, @Body() logUser: LogUser): Promise<LogUser> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LogUser', logUser.id);
    return await this.logUserService.update(logUser);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete logUser' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<LogUser> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'LogUser', id);
    const toDelete = await this.logUserService.findById(id);
    return await this.logUserService.delete(toDelete);
  }
}
