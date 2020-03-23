import request from '@/utils/request'
export function dailyOverview() {
  return request({
    url: `/api/overview/home`,
    method: 'get',
  })
}
