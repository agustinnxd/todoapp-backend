import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException('No token, authorization denied')
        };

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.SECRET
                }
            )
            request['user'] = payload
        } catch {
            throw new UnauthorizedException('Authorization denied')
        }
        return true
    }

    private extractTokenFromHeader(@Req() req: Request): string | undefined {
        const {token} = req.cookies

        return token
    }

}