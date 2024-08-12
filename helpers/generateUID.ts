export function generateUID() {
  const firstPart = ('000' + ((Math.random() * 46656) | 0).toString(36)).slice(-3);
  const secondPart = ('000' + ((Math.random() * 46656) | 0).toString(36)).slice(-3);

  return firstPart + secondPart;
}
