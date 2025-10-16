import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css"; 
import logo from "./../assets/exymc_logo.png";


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

  const handleGoogleLogin = () => {
    const apiUrl: string = import.meta.env.VITE_API_URL;
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.brandArea}>
        <img src={logo} alt="logo" className={styles.logo} />
          
          <p className={styles.subtitle}>Sign in to continue to the control center</p>
        </div>

        {/* ปุ่ม Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={styles.googleBtn}
        >
          <svg className={styles.googleIcon} viewBox="0 0 48 48" aria-hidden="true">
            <path d="M44.5 20H24v8.5h11.8C34.9 33.9 30.2 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.3l6-6C34.7 4 29.7 2 24 2 11.9 2 2 11.9 2 24s9.9 22 22 22c11.5 0 21-8.3 21-22 0-1.3-.1-2.7-.5-4z" fill="#FFC107"/>
            <path d="M6.3 14.7l7 5.1C14.9 16.3 19.1 13 24 13c3.3 0 6.3 1.2 8.6 3.3l6-6C34.7 4 29.7 2 24 2 15.3 2 7.7 6.9 3.7 14.1l2.6.6z" fill="#FF3D00"/>
            <path d="M24 46c6.1 0 11.8-2.3 16-6.1l-7.4-6.1C30.2 37 27.3 38 24 38c-6.1 0-11.2-3.9-13.1-9.3l-7.2 5.6C7.7 41.1 15.2 46 24 46z" fill="#4CAF50"/>
            <path d="M44.5 20H24v8.5h11.8c-1.1 3.2-3.6 5.8-6.7 7.3l7.4 6.1C40.6 39.7 46 34.2 46 24c0-1.3-.1-2.7-.5-4z" fill="#1976D2"/>
          </svg>
          <span>Sign in with Google</span>
        </button>

        <div className={styles.divider}><span>or</span></div>

        <form onSubmit={(e) => void handleLogin(e)} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="username"
              required
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className={styles.input}
            />
          </label>
          {/* ✅ ปุ่ม Login (submit) */}
          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>

          <div className={styles.metaRow}>
            <a className={styles.link} href="#">Forgot password?</a>
            <a className={styles.link} href="#">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
