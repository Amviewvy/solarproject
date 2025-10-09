import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
      const password = (form.elements.namedItem("password") as HTMLInputElement)
        .value;

      const apiUrl: string = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Login failed");
        return;
      }

      const { access_token, refresh_token } = (await res.json()) as {
        access_token: string;
        refresh_token: string;
      };
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      await navigate("/control-plc");
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => void handleLogin(e)}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Login</button>
      </form>
    </div>
  );
}
