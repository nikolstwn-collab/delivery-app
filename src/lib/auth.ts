import { users } from "@/data/users";

export const loginUser = (email: string, password: string) => {
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { error: "Email tidak ditemukan" };
  }

  if (user.password !== password) {
    return { error: "Password salah" };
  }

  return { success: true, user };
};