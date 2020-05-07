import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CepbrEndereco from '../../domain/cepbr-endereco.entity';
import { CepbrEnderecoService } from '../../service/cepbr-endereco.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cepbr-enderecos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cepbr-enderecos')
export class CepbrEnderecoController {
  logger = new Logger('CepbrEnderecoController');

  constructor(private readonly cepbrEnderecoService: CepbrEnderecoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CepbrEndereco
  })
  async getAll(@Req() req: Request): Promise<CepbrEndereco[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cepbrEnderecoService.findAndCount(
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
    type: CepbrEndereco
  })
  async getOne(@Param('id') id: string): Promise<CepbrEndereco> {
    return await this.cepbrEnderecoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cepbrEndereco' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CepbrEndereco
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cepbrEndereco: CepbrEndereco): Promise<CepbrEndereco> {
    console.info(cepbrEndereco);
    const created = await this.cepbrEnderecoService.save(cepbrEndereco);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CepbrEndereco', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cepbrEndereco' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CepbrEndereco
  })
  async put(@Req() req: Request, @Body() cepbrEndereco: CepbrEndereco): Promise<CepbrEndereco> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CepbrEndereco', cepbrEndereco.id);

    return await this.cepbrEnderecoService.update(cepbrEndereco);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cepbrEndereco' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CepbrEndereco> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CepbrEndereco', id);
    const toDelete = await this.cepbrEnderecoService.findById(id);
    return await this.cepbrEnderecoService.delete(toDelete);
  }
}
