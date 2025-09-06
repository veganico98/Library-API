import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/app/enums/role.enum";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: UserRole;
}
