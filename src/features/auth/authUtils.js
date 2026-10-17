
export async function hashPassword(password) {
  const encodedPassword = new TextEncoder().encode(password);

  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    encodedPassword
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
