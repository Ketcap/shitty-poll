import {
  ActionIcon,
  Button,
  Container,
  Group,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useSignal } from "@preact/signals";

import { IconMinus, IconPlus } from "@tabler/icons";
import { supabase } from "../../utils/supabase";

export const CreatePoll = ({}: { path: string }) => {
  const count = useSignal(3);
  const onSubmit = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { question, ...answers } = Object.fromEntries(formData);
    const isAnyEmpty = Object.values(answers).some((e) => !e);
    if (isAnyEmpty) {
      alert("Fill in the blanks");
      return;
    }

    try {
      await supabase.from("poll").insert({
        question: question,
        answers: Object.values(answers).map((e) => ({
          answer: e,
          votes: 0,
        })),
      });
      alert("hurra");
    } catch {
      alert("Something went wrong");
    }
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput placeholder="Your poll question" name="question" />
          <Group>
            <ActionIcon<"button">
              size={28}
              variant="transparent"
              onClick={() => count.value--}
              disabled={count.value === 2}
            >
              <IconMinus size={16} stroke={1.5} />
            </ActionIcon>

            <NumberInput<number>
              variant="unstyled"
              min={2}
              max={8}
              value={count.value}
              onChange={(value: number) => (count.value = value)}
              sx={{ width: 20, textAlign: "center" }}
            />

            <ActionIcon<"button">
              size={28}
              variant="transparent"
              onClick={() => count.value++}
              disabled={count.value === 8}
            >
              <IconPlus size={16} stroke={1.5} />
            </ActionIcon>
          </Group>
          {[...Array(count.value)].map((_, i) => (
            <TextInput
              placeholder={`Option ${i + 1}`}
              name={`option${i + 1}`}
            />
          ))}
          <Button type="submit">Create Poll</Button>
        </Stack>
      </form>
    </Container>
  );
};
