import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: String(user.userId), username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = this.generateRefreshToken(user.userId);

    return { access_token: accessToken, refresh_token: refreshToken};
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const decoded = this.jwtService.verify(refreshToken);


      const userId = decoded.sub;
      const accessToken = await this.jwtService.signAsync({ sub: userId });
      const newRefreshToken = this.generateRefreshToken(userId);

      return { access_token: accessToken, refresh_token: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private generateRefreshToken(userId: string): string {
    const payload = { sub: userId, type: 'refresh_token' };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
