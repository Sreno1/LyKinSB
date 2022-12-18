import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Profile = {
  id: string;
  email: string;
};

export async function isPlayer({
  email
}: Pick<Profile, "id"> & { email: User["email"] }) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (!error && data.id != null) {
    const { data2, error2 } = await supabase
        .from("player_characters")
        .select("*")
        .eq("profile_id", data.id)
        .single();
        if(!error2 && data2.id != null) {
            return true;
        }
        else {
            return false;
        }
  }

  return null;
}