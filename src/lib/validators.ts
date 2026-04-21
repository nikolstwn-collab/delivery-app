export const validateLogin = (email: string, password: string) => {
  if (!email || !password) {
    return "Email dan password wajib diisi";
  }

  if (password.length < 6) {
    return "Password minimal 6 karakter";
  }

  return null;
};