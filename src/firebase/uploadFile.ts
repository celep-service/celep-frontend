import { FirebaseStorageUploadError } from '@/error'
import { firebaseApp } from '@/firebase'
import { ref as firebaseStorageRef, getStorage, uploadBytes } from 'firebase/storage'

const uploadFile = async (file: File, fileName: string) => {
  try {
    const storage = getStorage(firebaseApp)
    const storageRef = firebaseStorageRef(storage, fileName)
    return await uploadBytes(storageRef, file as Blob)
  } catch (error) {
    throw new FirebaseStorageUploadError()
  }
}

export default uploadFile
