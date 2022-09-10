import { signal } from "@preact/signals";
import { Session } from "@supabase/supabase-js";

export const user = signal<Session | undefined>(undefined);
