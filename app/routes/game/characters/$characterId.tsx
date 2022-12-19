import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Character, setExperience } from "~/models/character.server";
import { deleteCharacter, getCharacter } from "~/models/character.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import Button from "~/components/CustomButtonComponent";

type LoaderData = {
  character: Character;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.characterId, "characterId not found");

  const character = await getCharacter({ userId, id: params.characterId });
  if (!character) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ character });
};

// why is the action/form submit how they did this?
// I can't do CRUD this way without multiple forms or a selector which is clunky
export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.characterId, "noteId not found");

  await deleteCharacter({ userId, id: params.characterId });

  return redirect("/game/characters");
};

export default function CharacterDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  // todo: figure out how to display and manipulate stats here like experience and health
  // onclick alert worked, but setting database values doesn't seem to be as easy
  return (
    <div>
      <h3 className="text-2xl font-bold">{data.character.name} {data.character.last}</h3>
      <hr className="my-4" />
      <h3 className="text-2xl font-bold">{data.character.age} years old</h3>
      <h3 className="text-2xl font-bold">{data.character.health}% health</h3>
      <h3 className="text-2xl font-bold">{data.character.experience} experience</h3>
      
      <Button 
        border="none"
        color="pink"
        height = "200px"
        onClick={
          async () => await setExperience(data.character.experience+10, data.character.id)
          }
        radius = "50%"
        width = "200px"
        children = "I'm a pink circle!"
      />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
