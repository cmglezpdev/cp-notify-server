import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (fields: string[] = [], ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;
        if(!user) {
            throw new InternalServerErrorException('User not found (request)');
        }

        if(fields.length === 0) return user;
        if(fields.length === 1) return user[fields[0]];

        let mappedUser = {}
        fields.forEach(field => mappedUser[field] = user[field]);
        return mappedUser;   
    }
); 