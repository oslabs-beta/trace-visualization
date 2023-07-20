const isValidUri = (uriString: string) => {
  try {
    return Boolean(new URL(uriString))
  } catch (err) {
    return false
  }
}

export default isValidUri;
