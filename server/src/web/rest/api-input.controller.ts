import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ApiInput from '../../domain/api-input.entity';
import { ApiInputService } from '../../service/api-input.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/api-inputs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('api-inputs')
export class ApiInputController {
  logger = new Logger('ApiInputController');

  constructor(private readonly apiInputService: ApiInputService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ApiInput
  })
  async getAll(@Req() req: Request): Promise<ApiInput[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.apiInputService.findAndCount(
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
    type: ApiInput
  })
  async getOne(@Param('id') id: string): Promise<ApiInput> {
    return await this.apiInputService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create apiInput' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ApiInput
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() apiInput: ApiInput): Promise<ApiInput> {
    console.info(apiInput);
    const created = await this.apiInputService.save(apiInput);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiInput', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update apiInput' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ApiInput
  })
  async put(@Req() req: Request, @Body() apiInput: ApiInput): Promise<ApiInput> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ApiInput', apiInput.id);

    return await this.apiInputService.update(apiInput);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete apiInput' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ApiInput> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ApiInput', id);
    const toDelete = await this.apiInputService.findById(id);
    return await this.apiInputService.delete(toDelete);
  }
}
