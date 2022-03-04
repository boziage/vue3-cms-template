import boRequest from '@/service'

export function getPageListData(url: string, params: any) {
  return boRequest.get({
    url,
    params,
    showLoading: true
  })
}

export function changeState(url: string) {
  return boRequest.request({
    method: 'PUT',
    url
  })
}

export function createPageData(url: string, newData: any) {
  return boRequest.post({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return boRequest.request({
    method: 'PUT',
    url,
    data: editData
  })
}

export function deletePageData(url: string) {
  return boRequest.delete({
    url
  })
}
