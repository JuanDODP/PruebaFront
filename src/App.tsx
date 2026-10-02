import { CssBaseline } from "@mui/material";
import { StateProvider } from "./contexts/State.Context";
import { AppRouter } from "./routes/AppRouter";
export const App = () => {
  return (
    <StateProvider>
    <CssBaseline />
    <AppRouter/>
    </StateProvider>
  )
}
