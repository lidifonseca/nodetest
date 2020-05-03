import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadPtaTemp from '../../domain/pad-pta-temp.entity';
import { PadPtaTempService } from '../../service/pad-pta-temp.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-pta-temps')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-pta-temps')
export class PadPtaTempController {
  logger = new Logger('PadPtaTempController');

  constructor(private readonly padPtaTempService: PadPtaTempService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadPtaTemp
  })
  async getAll(@Req() req: Request): Promise<PadPtaTemp[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padPtaTempService.findAndCount(
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
    type: PadPtaTemp
  })
  async getOne(@Param('id') id: string): Promise<PadPtaTemp> {
    return await this.padPtaTempService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padPtaTemp' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadPtaTemp
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padPtaTemp: PadPtaTemp): Promise<PadPtaTemp> {
    const created = await this.padPtaTempService.save(padPtaTemp);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadPtaTemp', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padPtaTemp' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadPtaTemp
  })
  async put(@Req() req: Request, @Body() padPtaTemp: PadPtaTemp): Promise<PadPtaTemp> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadPtaTemp', padPtaTemp.id);
    return await this.padPtaTempService.update(padPtaTemp);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padPtaTemp' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadPtaTemp> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadPtaTemp', id);
    const toDelete = await this.padPtaTempService.findById(id);
    return await this.padPtaTempService.delete(toDelete);
  }
}
