import { Container, Group, Text } from "@mantine/core";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Link } from "preact-router/match";
import { supabase } from "../../utils/supabase";

export const Dashboard = ({}: { path: string }) => {
  const polls = useSignal([]);

  useEffect(() => {
    const fn = async () => {
      const { data, error } = await supabase.from("poll").select("*");
      polls.value = data as unknown[];

      supabase
        .from("poll")
        .on("INSERT", ({ new: newPoll }) => {
          polls.value = [newPoll, ...polls.value];
        })
        .subscribe();
    };
    fn();
  }, []);

  return (
    <Container>
      <h1>Dashboard</h1>
      {polls.value.map((e) => (
        <a href={`/detail/${e.id}`}>
          <Group>
            <Text>
              Question: <b>{e.question}</b>
            </Text>
            <Text>Options count: {e.answers.length}</Text>
          </Group>
        </a>
      ))}
    </Container>
  );
};
