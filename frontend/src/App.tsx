import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { ThemeProvider } from './app/contexts/theme/Provider';
import router from './app/router/router';
import { AuthProvider } from './app/contexts/auth/Provider';

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>

      <ThemeProvider>

        <AuthProvider>

          <RouterProvider router={router} />

        </AuthProvider>



      </ThemeProvider>

    </QueryClientProvider>
  )
}

export default App
