import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemSorteioFeito from '../../domain/pad-item-sorteio-feito.entity';
import { PadItemSorteioFeitoService } from '../../service/pad-item-sorteio-feito.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-sorteio-feitos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-sorteio-feitos')
export class PadItemSorteioFeitoController {
  logger = new Logger('PadItemSorteioFeitoController');

  constructor(private readonly padItemSorteioFeitoService: PadItemSorteioFeitoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemSorteioFeito
  })
  async getAll(@Req() req: Request): Promise<PadItemSorteioFeito[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemSorteioFeitoService.findAndCount(
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
    type: PadItemSorteioFeito
  })
  async getOne(@Param('id') id: string): Promise<PadItemSorteioFeito> {
    return await this.padItemSorteioFeitoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemSorteioFeito' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemSorteioFeito
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemSorteioFeito: PadItemSorteioFeito): Promise<PadItemSorteioFeito> {
    console.info(padItemSorteioFeito);
    const created = await this.padItemSorteioFeitoService.save(padItemSorteioFeito);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemSorteioFeito', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemSorteioFeito' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemSorteioFeito
  })
  async put(@Req() req: Request, @Body() padItemSorteioFeito: PadItemSorteioFeito): Promise<PadItemSorteioFeito> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemSorteioFeito', padItemSorteioFeito.id);

    return await this.padItemSorteioFeitoService.update(padItemSorteioFeito);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemSorteioFeito' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemSorteioFeito> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemSorteioFeito', id);
    const toDelete = await this.padItemSorteioFeitoService.findById(id);
    return await this.padItemSorteioFeitoService.delete(toDelete);
  }
}
