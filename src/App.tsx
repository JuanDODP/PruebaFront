import { CssBaseline, ThemeProvider } from "@mui/material";
import { StateProvider } from "./contexts/State.Context";
import { AppRouter } from "./routes/AppRouter";
import { theme } from "./theme/theme";
import { ApiDataProvider } from "./contexts/api/Data.Context";
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApiDataProvider>

        <StateProvider>
          <CssBaseline />
          <AppRouter />
        </StateProvider>
      </ApiDataProvider>
    </ThemeProvider>
  )
}
