import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const allBlogs = api.post.getAllBlogs.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 Blog</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">T3</span> App Blog
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allBlogs.data?.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`} className="group">
                <div className="transform rounded-xl bg-white/10 p-6 transition-all duration-300 hover:bg-white/20">
                  <h3 className="mb-4 text-2xl font-bold group-hover:text-[hsl(280,100%,70%)]">
                    {blog.title}
                  </h3>
                  <div className="mb-4 text-lg">{blog.description}</div>
                  <span className="text-base text-gray-400">
                    {blog.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/postBlog"
              className="rounded-md bg-orange-500 px-6 py-4 font-medium"
            >
              投稿する
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
