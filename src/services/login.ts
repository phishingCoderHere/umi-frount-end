import request from '@/utils/request';
import { read } from '@/utils/cookie-utils';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
}
export interface AuthParamsType {
  userName: string;
  password: string;
  rememberMe: string;
  submit: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

// spring 框架鉴权
export async function authentication(params: AuthParamsType) {
  return request('/api/authentication', {
    method: 'POST',
    params
  });
}

// 获取session
export async function getSession() {
  return request('/api/account', {
    method: 'get',
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
