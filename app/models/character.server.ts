import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Character = {
  id: string;
  name: string;
  last: string;
  profile_id: string;
};

export async function getCharacterListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("player_characters")
    .select("id, name")
    .eq("associated_uid", userId);

  return data;
}

export async function createCharacter({
  name,
  last,
  userId,
}: Pick<Character, "last" | "name"> & { userId: User["id"] }) {  const { data, error } = await supabase
    .from("player_characters")
    .insert([{ name, last, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }
  return null;
}

export async function deleteCharacter({
  id,
  userId,
}: Pick<Character, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("player_characters")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getCharacter({
  id,
  userId,
}: Pick<Character, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("player_characters")
    .select("*")
    .eq("associated_uid", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.associated_uid,
      id: data.id,
      name: data.name,
    };
  }

  return null;
}
