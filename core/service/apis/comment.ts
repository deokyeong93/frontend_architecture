import { http } from '../../../core/lib/http'
import { BASE_URL } from '../../constant'

export const readComment = async (postId: number) => {
  try {
    const result = await http.get(`${BASE_URL}/comments`, { postId })

    return result
  } catch(error) {
    throw error
  }
}