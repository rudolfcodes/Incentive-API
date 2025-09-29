import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class SuperAdminGuard extends GqlAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, run the JWT authentication
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      console.log('SuperAdminGuard - Authentication failed');
      return false;
    }

    // Then check the role
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user = req.user;
    console.log('SuperAdminGuard - User:', user); // 👈 Debug log

    const isSuperAdmin = user && user.role === 'super_admin';
    console.log('SuperAdminGuard - Is Super Admin:', isSuperAdmin);
    return isSuperAdmin;
  }
}
