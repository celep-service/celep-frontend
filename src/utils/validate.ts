export const isValidEmail = (email: string) => {
  const emailPatternRegex = /^.+@.+\..+$/
  if (!emailPatternRegex.test(email)) {
    return false
  }
  return true
}