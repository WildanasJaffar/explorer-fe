import { api } from './axios'

export class FolderApi {
  async get(parentId) {
    const { data } = await api.get(`/folders/${parentId}`)
    return data
  }

  async files(folderId) {
    const { data } = await api.get(`/folders/${folderId}/files`)
    return data
  }

  async path(parentId) {
    const { data } = await api.get(`/folders/${parentId}/path`)
    return data
  }

  async search(q) {
    const { data } = await api.get(`/folders/search/${q}`)
    return data
  }
}
