import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Tela from '../../domain/tela.entity';
import { TelaService } from '../../service/tela.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/telas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('telas')
export class TelaController {
  logger = new Logger('TelaController');

  constructor(private readonly telaService: TelaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Tela
  })
  async getAll(@Req() req: Request): Promise<Tela[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.telaService.findAndCount(
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
    type: Tela
  })
  async getOne(@Param('id') id: string): Promise<Tela> {
    return await this.telaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tela' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Tela
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tela: Tela): Promise<Tela> {
    const created = await this.telaService.save(tela);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Tela', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tela' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Tela
  })
  async put(@Req() req: Request, @Body() tela: Tela): Promise<Tela> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Tela', tela.id);
    return await this.telaService.update(tela);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tela' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Tela> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Tela', id);
    const toDelete = await this.telaService.findById(id);
    return await this.telaService.delete(toDelete);
  }
}
