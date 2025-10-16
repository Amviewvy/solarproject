import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payload = params.get("payload");
    if (payload) {
      try {
        const decoded = JSON.parse(atob(decodeURIComponent(payload)));
        const { access_token, refresh_token } = decoded;
        if (access_token && refresh_token) {
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
  
          navigate("/control-plc", { replace: true });
        } else {
          navigate("/login?error=missing_token", { replace: true });
        }
      } catch (err) {
        console.error("Error decoding payload:", err);
        navigate("/login?error=invalid_payload", { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Logging in with Google...</h2>
      <p>Please wait...</p>
    </div>
  );
}
