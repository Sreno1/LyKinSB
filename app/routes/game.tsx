import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { useUser } from "~/utils";



export default function GamePage() {

  /*if (player) {*/
    return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="village" className="block p-4 text-xl text-blue-500">
            View Village
          </Link>
          <Link to="characters" className="block p-4 text-xl text-blue-500">
            View Characters
          </Link>

          <hr />
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
