import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ApiReturn from '../../domain/api-return.entity';
import { ApiReturnService } from '../../service/api-return.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/api-returns')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('api-returns')
export class ApiReturnController {
  logger = new Logger('ApiReturnController');

  constructor(private readonly apiReturnService: ApiReturnService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ApiReturn
  })
  async getAll(@Req() req: Request): Promise<ApiReturn[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.apiReturnService.findAndCount(
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
    type: ApiReturn
  })
  async getOne(@Param('id') id: string): Promise<ApiReturn> {
    return await this.apiReturnService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create apiReturn' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ApiReturn
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() apiReturn: ApiReturn): Promise<ApiReturn> {
    console.info(apiReturn);
    const created = await this.apiReturnService.save(apiReturn);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiReturn', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update apiReturn' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ApiReturn
  })
  async put(@Req() req: Request, @Body() apiReturn: ApiReturn): Promise<ApiReturn> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiReturn', apiReturn.id);

    return await this.apiReturnService.update(apiReturn);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete apiReturn' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ApiReturn> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ApiReturn', id);
    const toDelete = await this.apiReturnService.findById(id);
    return await this.apiReturnService.delete(toDelete);
  }
}
