import { Experience } from "src/models/enums/experience.enum";
import { Role } from "src/models/enums/role.enum";

export interface Jwt {
    email: string;
    role: Role;
    experience?: Experience;
    googleAccessToken?: string;
    iat?: number;
    exp?: number;
}