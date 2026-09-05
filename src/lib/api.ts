// src/lib/api.ts
// Centralised API base URL — works locally (Vite proxy) and in production (Render backend).
export const API_BASE = import.meta.env.VITE_API_URL || ''
