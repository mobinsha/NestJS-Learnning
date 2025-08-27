import { SetMetadata } from '@nestjs/common';
import { UserPermission } from '../../modules/users/entities/user.entity';

export const Permissions = (...permissions: UserPermission[]) => SetMetadata('permissions', permissions);
export const Public = () => SetMetadata('isPublic', true);
