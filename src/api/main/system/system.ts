import boRequest from '@/service'

export function getPageListData(url: string, params: any) {
  return boRequest.get({
    url,
    params
  })
}
