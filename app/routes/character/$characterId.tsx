import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Character } from "~/models/character.server";
import { deleteCharacter, getCharacter } from "~/models/character.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

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

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.characterId, "noteId not found");

  await deleteCharacter({ userId, id: params.characterId });

  return redirect("/notes");
};

export default function CharacterDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.character.name}</h3>
      <hr className="my-4" />
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
