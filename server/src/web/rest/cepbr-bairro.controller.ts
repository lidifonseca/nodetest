import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CepbrBairro from '../../domain/cepbr-bairro.entity';
import { CepbrBairroService } from '../../service/cepbr-bairro.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cepbr-bairros')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cepbr-bairros')
export class CepbrBairroController {
  logger = new Logger('CepbrBairroController');

  constructor(private readonly cepbrBairroService: CepbrBairroService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CepbrBairro
  })
  async getAll(@Req() req: Request): Promise<CepbrBairro[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cepbrBairroService.findAndCount(
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
    type: CepbrBairro
  })
  async getOne(@Param('id') id: string): Promise<CepbrBairro> {
    return await this.cepbrBairroService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cepbrBairro' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CepbrBairro
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cepbrBairro: CepbrBairro): Promise<CepbrBairro> {
    const created = await this.cepbrBairroService.save(cepbrBairro);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CepbrBairro', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cepbrBairro' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CepbrBairro
  })
  async put(@Req() req: Request, @Body() cepbrBairro: CepbrBairro): Promise<CepbrBairro> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CepbrBairro', cepbrBairro.id);
    return await this.cepbrBairroService.update(cepbrBairro);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cepbrBairro' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CepbrBairro> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CepbrBairro', id);
    const toDelete = await this.cepbrBairroService.findById(id);
    return await this.cepbrBairroService.delete(toDelete);
  }
}
