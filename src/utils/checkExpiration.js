export const checkExpiration = iat => {
  const lifetime = Math.round(new Date().getTime() / 1000 - iat)

  return lifetime > 3600
}
