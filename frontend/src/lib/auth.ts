// ตัวอย่างเรียก API จริง
export async function login(payload: { username: string; password: string }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  return data.token as string;
}
