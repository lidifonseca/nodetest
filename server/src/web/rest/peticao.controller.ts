import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Peticao from '../../domain/peticao.entity';
import { PeticaoService } from '../../service/peticao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/peticaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('peticaos')
export class PeticaoController {
  logger = new Logger('PeticaoController');

  constructor(private readonly peticaoService: PeticaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Peticao
  })
  async getAll(@Req() req: Request): Promise<Peticao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.peticaoService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Peticao
  })
  async getOne(@Param('id') id: string): Promise<Peticao> {
    return await this.peticaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create peticao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Peticao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() peticao: Peticao): Promise<Peticao> {
    const created = await this.peticaoService.save(peticao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Peticao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update peticao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Peticao
  })
  async put(@Req() req: Request, @Body() peticao: Peticao): Promise<Peticao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Peticao', peticao.id);
    return await this.peticaoService.update(peticao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete peticao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Peticao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Peticao', id);
    const toDelete = await this.peticaoService.findById(id);
    return await this.peticaoService.delete(toDelete);
  }
}
