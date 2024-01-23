import { http } from '../../../core/lib/http'
import { BASE_URL } from '../../constant'

export const readPosts = async (postId: number) => {
  try {
    const result = await http.get(`${BASE_URL}/posts`)

    return result
  } catch(error) {
    throw error
  }
}