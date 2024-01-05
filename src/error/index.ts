export class FirebaseStorageUploadError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'FirebaseStorageUploadError'
  }
}
