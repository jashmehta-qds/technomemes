import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>cuteastros</title>
        <meta
          name="description"
          content="technomemes is a unique collection of memes in the tech realm"
        />
      </Head>

      <div className="w-full min-h-screen">
        <nav>

          <ul className="flex justify-end items-center gap-x-4 body-font border-bottom-1 mint__card p-8">
          <div className=" flex-auto justify-between items-center">
            <h2 className="heading text-3xl w-full">TechnoMemes</h2>
          </div>
            <li
              className={`${
                router.asPath == "/" ? "font-bold text-white cursor-pointer" : "text-slate-900 cursor-pointer"
              }`}
            >
              <Link href="/" ><b className="text-xl ">mint</b></Link>
            </li>
            <li
              className={`${
                router.asPath == "/about"
                  ? "font-bold text-white cursor-pointer"
                  : "text-slate-900 cursor-pointer"
              }`}
            >
              <Link href="/about"><b className="text-xl">about</b></Link>
            </li>
          </ul>
        </nav>

        <main className="min-h-[90vh] flex justify-center">{children}</main>
      </div>
    </>
  );
};

export default Layout;
