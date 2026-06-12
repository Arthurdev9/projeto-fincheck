import { IsNotEmpty, IsString, IsUrl, NotEquals, ValidateIf, validateSync } from 'class-validator';
import { Transform, plainToInstance } from 'class-transformer';

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;

  @ValidateIf((_, value) => value !== '*')
  @IsString({ each: true })
  @IsUrl({ require_tld: false, require_protocol: true }, { each: true })
  @IsNotEmpty()
  @Transform((params) => {
    if (params.value === '*') return params.value;
    const result = params.value?.split(';');
    return result ? result : [];
  })
  allowedOrigins: string | string[];

  constructor(jwtSecret: string, allowedOrigins: string | string[]) {
    this.jwtSecret = jwtSecret;
    this.allowedOrigins = allowedOrigins;
  }
}

const envConfig = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  allowedOrigins: process.env.ALLOWED_ORIGINS,
});

const errors = validateSync(envConfig);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}

export default envConfig;
