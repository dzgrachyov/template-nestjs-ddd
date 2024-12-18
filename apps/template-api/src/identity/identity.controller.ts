import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('identity')
@ApiTags('identity')
export class IdentityController { }
