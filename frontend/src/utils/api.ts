export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
};

async function fetchWithAuth<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const access_token = localStorage.getItem("access_token");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status === 401) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const refresh_token = localStorage.getItem("refresh_token");
    const refreshRes = await fetch(`${apiUrl}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token }),
    });
    if (!refreshRes.ok) {
      localStorage.clear();
      window.location.href = "/login";
      return res;
    }

    const refresh_data = (await refreshRes.json()) as RefreshResponse;
    localStorage.setItem("access_token", refresh_data.access_token);

    res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${refresh_data.access_token}`,
      },
    });
  }

  try {
    const data = (await res.json()) as T;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: res.ok, status: res.status };
  }
}

export default fetchWithAuth;
