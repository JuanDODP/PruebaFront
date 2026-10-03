import { CssBaseline, ThemeProvider } from "@mui/material";
import { StateProvider } from "./contexts/State.Context";
import { AppRouter } from "./routes/AppRouter";
import { theme } from "./theme/theme";
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <StateProvider>
    <CssBaseline />
    <AppRouter/>
    </StateProvider>
    </ThemeProvider>
  )
}
