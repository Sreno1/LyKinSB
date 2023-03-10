import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Character = {
  id: string;
  name: string;
  last: string;
  profile_id: string;
  age: number;
  health: number;
  experience: number;
};

export async function getCharacterListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("player_characters")
    .select("id, name")
    .eq("profile_id", userId);

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

export async function setExperience(amount: number, characterId: string) {  

  const { data, error } = await supabase
    .from("player_characters")
    .update([{ experience: amount }])
    .eq('profile_id', 'someValue')

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
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      name: data.name,
      last: data.last,
      age: data.age,
      health: data.health,
      experience: data.experience
    };
  }

  return null;
}
