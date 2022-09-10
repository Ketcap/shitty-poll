import {
  Container,
  PasswordInput,
  TextInput,
  Stack,
  Button,
  Grid,
} from "@mantine/core";
import { supabase } from "../../utils/supabase";

interface Form {
  email: string;
  password: string;
}

const BITCHES = "Bitches";

export const Signup = ({}: { path: String }) => {
  const onSignup = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData) as unknown as Form;

    try {
      await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
    } catch {}
  };

  const onLogin = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData) as unknown as Form;

    try {
      await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });
    } catch {}
  };

  return (
    <Container>
      <Grid>
        <Grid.Col span={6}>
          <form onSubmit={onSignup}>
            <Stack sx={{ marginTop: 100 }}>
              <TextInput placeholder="Your email" name="email" />
              <PasswordInput placeholder="Your password" name="password" />
              <Button type="submit"> Signup {BITCHES} </Button>
            </Stack>
          </form>
        </Grid.Col>
        <Grid.Col span={6}>
          <form onSubmit={onLogin}>
            <Stack sx={{ marginTop: 100 }}>
              <TextInput placeholder="Your email" name="email" />
              <PasswordInput placeholder="Your password" name="password" />
              <Button type="submit"> Login {BITCHES} </Button>
            </Stack>
          </form>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
