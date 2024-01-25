import { FirebaseStorageUploadError } from '@/error'
import { firebaseApp } from '@/firebase'
import { ref as firebaseStorageRef, getStorage, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

const uploadFile = async (file: File) => {
  try {
    const storage = getStorage(firebaseApp)
    const randomFileName = uuidv4()
    const storageRef = firebaseStorageRef(storage, randomFileName)
    return await uploadBytes(storageRef, file as Blob)
  } catch (error) {
    throw new FirebaseStorageUploadError()
  }
}

export default uploadFile
