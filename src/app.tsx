import { MantineProvider } from "@mantine/core";
import Router from "preact-router";
import { CreatePoll } from "./components/createpoll";
import { Dashboard } from "./components/dashboard";
import { Detail } from "./components/detail";
import { Signup } from "./components/signup";
import "./utils/supabaseAuth";

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Signup path="/signup" />
        <Dashboard path="/" />
        <CreatePoll path="/createpoll" />
        <Detail path="/detail/:id" />
      </Router>
    </MantineProvider>
  );
}
