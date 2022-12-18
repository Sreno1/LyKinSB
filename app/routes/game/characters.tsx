import type { LoaderArgs } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { Character } from "~/models/character.server";
import { getCharacterListItems } from "~/models/character.server";
import { requireUserId } from "~/session.server";
type LoaderData = {
  characterListItems: Character[];
};

export async function loader ({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const characterListItems = await getCharacterListItems({ userId });
  return json({ characterListItems });
};

export default function CharactersPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;
  return (
    data.characterListItems.length === 0 ? (
        <p className="p-4">No characters yet</p>
        ) : (
        <div>
            <ol>
                {data.characterListItems.map((character) => (
                <li key={character.id}>
                    <NavLink
                    className={({ isActive }) =>
                        `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={character.id}
                    >
                    📝 {character.name}
                    </NavLink>
                </li>
                ))}
            </ol>
            <div>
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
  );
}