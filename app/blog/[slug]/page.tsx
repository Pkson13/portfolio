import { Button } from "@/components/ui/button"
import { titles } from "@/lib/blog"
import { marked } from "marked"
import Link from "next/link"

import { notFound } from "next/navigation"

import { readFileSync } from "node:fs"
import path from "node:path"

export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())

  return titles.map((title) => ({
    slug: title.file,
  }))
}
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = await params
  console.log(process.cwd())
  const filePath = path.join(process.cwd(), 'blogs', `${slug.slug}.md`);
  let res
  try {
    res = readFileSync(filePath, "utf8")


  } catch (err) {

    notFound()
  }

  const html = marked.parse(res)

  console.log(html)
  console.log(filePath)
  return (
    <article className="max-w-2xl mx-auto px-4 md:w-3/5 prose dark:prose-invert"
      id="markdown"
    >
      <div className="my-6">
        <Button asChild variant={"outline"} size={"sm"} className="rounded-full size-12">
          <Link href={"/blog"} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>

          </Link>
        </Button>
      </div>
      {/* {slug.slug} */}
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </article>
  )
}

export default page
