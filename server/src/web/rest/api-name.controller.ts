import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ApiName from '../../domain/api-name.entity';
import { ApiNameService } from '../../service/api-name.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/api-names')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('api-names')
export class ApiNameController {
  logger = new Logger('ApiNameController');

  constructor(private readonly apiNameService: ApiNameService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ApiName
  })
  async getAll(@Req() req: Request): Promise<ApiName[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.apiNameService.findAndCount(
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
    type: ApiName
  })
  async getOne(@Param('id') id: string): Promise<ApiName> {
    return await this.apiNameService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create apiName' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ApiName
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() apiName: ApiName): Promise<ApiName> {
    const created = await this.apiNameService.save(apiName);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiName', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update apiName' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ApiName
  })
  async put(@Req() req: Request, @Body() apiName: ApiName): Promise<ApiName> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiName', apiName.id);
    return await this.apiNameService.update(apiName);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete apiName' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ApiName> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ApiName', id);
    const toDelete = await this.apiNameService.findById(id);
    return await this.apiNameService.delete(toDelete);
  }
}
