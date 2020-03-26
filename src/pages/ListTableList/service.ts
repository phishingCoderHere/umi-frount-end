import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/users', {
    params,
  }).then(resp => {
    const result = {
      data: resp,
      total: resp.length,
      success: true,
      pageSize: 1,
      current: 1,
    };
    return result
  })
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params: TableListParams) {
  return request('/api/users', {
    method: 'PUT',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function getRoles() {
  return request('/api/users/authorities', {
    method: 'GET',
  })
}