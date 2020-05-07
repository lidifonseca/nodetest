import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Junho from '../../domain/junho.entity';
import { JunhoService } from '../../service/junho.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/junhos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('junhos')
export class JunhoController {
  logger = new Logger('JunhoController');

  constructor(private readonly junhoService: JunhoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Junho
  })
  async getAll(@Req() req: Request): Promise<Junho[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.junhoService.findAndCount(
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
    type: Junho
  })
  async getOne(@Param('id') id: string): Promise<Junho> {
    return await this.junhoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create junho' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Junho
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() junho: Junho): Promise<Junho> {
    console.info(junho);
    const created = await this.junhoService.save(junho);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Junho', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update junho' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Junho
  })
  async put(@Req() req: Request, @Body() junho: Junho): Promise<Junho> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Junho', junho.id);

    return await this.junhoService.update(junho);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete junho' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Junho> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Junho', id);
    const toDelete = await this.junhoService.findById(id);
    return await this.junhoService.delete(toDelete);
  }
}
