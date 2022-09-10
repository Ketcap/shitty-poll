import { Button, Container, Stack, Text } from "@mantine/core";
import { useRouter } from "preact-router";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { supabase } from "../../utils/supabase";

export const Detail = ({}: { path: string }) => {
  const [route] = useRouter();
  const poll = useSignal({});
  useEffect(() => {
    const fn = async () => {
      const { id } = route.matches || {};
      const { data } = await supabase
        .from("poll")
        .select("*")
        .eq("id", id)
        .single();
      poll.value = data;

      supabase
        .from(`poll:id=eq.${id}`)
        .on("UPDATE", (payload) => {
          poll.value = payload.new;
        })
        .subscribe();
    };
    fn();
  }, []);

  const voteTo = async (index: number) => {
    const { id } = route.matches || {};
    const { answers } = poll.value;
    answers[index].votes++;
    await supabase.from("poll").update({ answers }).eq("id", id);
  };

  return (
    <Container>
      <Stack>
        <h1>{poll.value.question}</h1>
        <ul>
          {poll.value.answers?.map((e, index) => (
            <li>
              <Text size={24}>
                {e.answer} :{" "}
                <Button onClick={() => voteTo(index)}>{e.votes}</Button>
              </Text>
            </li>
          ))}
        </ul>
      </Stack>
    </Container>
  );
};
