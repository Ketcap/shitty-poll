import { Session } from "@supabase/supabase-js";
import { route } from "preact-router";
import { user } from "./authContext";
import { supabase } from "./supabase";

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event);
  switch (event) {
    case "SIGNED_IN":
      user.value = session as Session;
      // route("/");
      break;
    case "SIGNED_OUT":
      user.value = undefined;
      // route("/signup");
      break;
    default:
      break;
  }
});
