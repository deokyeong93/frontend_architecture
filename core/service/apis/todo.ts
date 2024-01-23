import { http } from '../../../core/lib/http'
import { BASE_URL } from '../../constant'

export const readUserToDos = async (userId: number) => {
  try {
    const result = await http.get(`${BASE_URL}/users/${userId}/todos`)

    return result
  } catch(error) {
    throw error
  }
}