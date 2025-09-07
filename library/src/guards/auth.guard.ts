import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/app/auth/auth.service";
import { UserService } from "src/app/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {
        
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);
            request.tokenPayload = data;
            request.user = await this.userService.findOne(data.id);

            return true;
        } catch (error) {
            return false;    
        }
    
    }
}