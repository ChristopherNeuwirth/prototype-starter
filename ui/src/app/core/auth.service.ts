import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userManager: UserManager;
  private user: User;
  private loginChangedSubject = new Subject<boolean>();

  public loginChanged = this.loginChangedSubject.asObservable();

  constructor() {
    const settings = {
      authority: `https://${environment.STS_AUTHORITY}`,
      client_id: `${environment.STS_CLIENT_ID}`,
      redirect_uri: `${environment.CLIENT_ROOT}/signin`,
      scope: `openid profile ${environment.STS_CUSTOM_SCOPE}`,
      response_type: 'code',
      // post_logout_redirect_uri: `${environment.CLIENT_ROOT}/signout`,
      revokeAccessTokenOnSignout: true,
      automaticSilentRenew: true,
      loadUserInfo: true,
      metadata: {
        issuer: `https://${environment.STS_AUTHORITY}/`,
        authorization_endpoint: `https://${environment.STS_AUTHORITY}/authorize?audience=${environment.STS_CUSTOM_SCOPE}`,
        jwks_uri: `https://${environment.STS_AUTHORITY}/.well-known/jwks.json`,
        token_endpoint: `https://${environment.STS_AUTHORITY}/oauth/token`,
        userinfo_endpoint: `https://${environment.STS_AUTHORITY}/userinfo`,
        end_session_endpoint: `https://${environment.STS_AUTHORITY}/v2/logout?client_id=${
          environment.STS_CLIENT_ID
        }&returnTo=${encodeURI(environment.CLIENT_ROOT + '/signout')}`,
        mfa_challenge_endpoint: `https://${environment.STS_AUTHORITY}/mfa/challenge`,
        registration_endpoint: `https://${environment.STS_AUTHORITY}/oidc/register`
      }
    };

    this.userManager = new UserManager(settings);
    console.log(settings.metadata.end_session_endpoint);
  }

  login() {
    return this.userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManager.getUser().then((u) => {
      const userCurrent = !!u && !u.expired;
      if (this.user !== u) {
        this.loginChangedSubject.next(userCurrent);
      }
      this.user = u;
      return userCurrent;
    });
  }

  completeLogin() {
    return this.userManager.signinRedirectCallback().then((u) => {
      this.user = u;
      this.loginChangedSubject.next(!!u && !u.expired);
      return u;
    });
  }

  logout() {
    this.userManager.signoutRedirect();
  }

  completeLogout() {
    this.user = null;
    return this.userManager.signoutRedirectCallback();
  }

  async getAccessToken() {
    const user = await this.userManager.getUser();
    if (!user && user.expired) {
      return null;
    }
    return user.access_token;
  }
}
