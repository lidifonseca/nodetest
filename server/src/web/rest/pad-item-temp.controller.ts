import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemTemp from '../../domain/pad-item-temp.entity';
import { PadItemTempService } from '../../service/pad-item-temp.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-temps')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-temps')
export class PadItemTempController {
  logger = new Logger('PadItemTempController');

  constructor(private readonly padItemTempService: PadItemTempService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemTemp
  })
  async getAll(@Req() req: Request): Promise<PadItemTemp[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemTempService.findAndCount(
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
    type: PadItemTemp
  })
  async getOne(@Param('id') id: string): Promise<PadItemTemp> {
    return await this.padItemTempService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemTemp' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemTemp
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemTemp: PadItemTemp): Promise<PadItemTemp> {
    console.info(padItemTemp);
    const created = await this.padItemTempService.save(padItemTemp);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemTemp', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemTemp' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemTemp
  })
  async put(@Req() req: Request, @Body() padItemTemp: PadItemTemp): Promise<PadItemTemp> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemTemp', padItemTemp.id);

    return await this.padItemTempService.update(padItemTemp);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemTemp' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemTemp> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemTemp', id);
    const toDelete = await this.padItemTempService.findById(id);
    return await this.padItemTempService.delete(toDelete);
  }
}
