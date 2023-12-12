import type { ApiErrorResponse } from '@/model/Api'
import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useAlertDialogStore = defineStore('alertDialog', () => {
  /* State */
  const dialogs = reactive<string[]>([])

  /* Action */
  const showAlertDialog = (body: string) => {
    dialogs.push(body)
  }
  const showErrorAlertDialog = (error: unknown) => {
    if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
      const { message, code } = error.response.data
      dialogs.push(`[에러 코드: ${code}] ${message}`)
    }
  }

  return { dialogs, showAlertDialog, showErrorAlertDialog }
})

export default useAlertDialogStore
