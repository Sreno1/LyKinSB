import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Character } from "~/models/character.server";
import { getCharacterListItems } from "~/models/character.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

type LoaderData = {
  characterListItems: Character[];
};

export async function loader ({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const characterListItems = await getCharacterListItems({ userId });
  return json({ characterListItems });
};

export default function GamePage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  /*if (player) {*/
    return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="village" className="block p-4 text-xl text-blue-500">
            View Village
          </Link>

          <hr />

          {data.characterListItems.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
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
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
  /*} else {
    return (
      <div className="flex h-full min-h-screen flex-col">
        <Header />
        <main className="flex h-full bg-white">
          
        </main>
        
      </div>
    );
  }*/
}

function Header() {
  const user = useUser();
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <h1 className="text-3xl font-bold">
        <Link to=".">LyKin</Link>
      </h1>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </header>
  );
}
