import { SessionData } from 'express-session';
import { JwtDecoded } from 'src/auth/dto';
import { Auth } from 'src/auth/model';

declare module 'express-session' {
       interface SessionData<T extends Auth, S extends JwtDecoded> {
         views: number;
         auth: T;
         jwt: S
  }
}
