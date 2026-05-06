import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Import test function in development
if (import.meta.env.DEV) {
  import('./lib/supabaseTest').then(({ testSupabaseConnection }) => {
    (window as any).testSupabase = testSupabaseConnection;
    console.log('💡 Run testSupabase() in console to verify Supabase setup');
  });
}

createRoot(document.getElementById("root")!).render(<App />);