import { titles } from "@/lib/blog"
import { marked } from "marked"

import { notFound } from "next/navigation"

import { readFileSync } from "node:fs"
import path from "node:path"

// export async functin generateStaticParams() {
//   // const posts = await fetch('https://.../posts').then((res) => res.json())
//
//   return titles.map((title) => ({
//     slug: title.title,
//   }))
// }
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
    <article className="max-w-2xl mx-auto px-4 w-3/5 prose dark:prose-invert"
      id="markdown"
    >
      {/* {slug.slug} */}
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </article>
  )
}

export default page
