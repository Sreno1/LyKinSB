import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createCharacter } from "~/models/character.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const name = formData.get("name");
  const last = formData.get("last");
  const character = await createCharacter({ name, last, userId });
  return redirect(`/game/characters/${character.id}`);
};

export default function NewCharacterPage() {
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "60%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Name: </span>
          <input
            name="name"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Last: </span>
          <input
            name="last"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
