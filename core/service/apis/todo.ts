import { http } from '../../../core/lib/http'
import { BASE_URL } from '../../constant'

export const readToDo = async (postId: number) => {
  try {
    const result = await http.get(`${BASE_URL}/todos`)

    return result
  } catch(error) {
    throw error
  }
}