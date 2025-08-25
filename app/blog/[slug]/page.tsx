import { titles } from "@/lib/blog"
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
  const filePath = path.join(process.cwd(), 'README.md');
  const res = readFileSync(filePath, "utf8")

  console.log(filePath)
  return (
    <div className="max-w-2xl mx-auto px-4 w-3/5"
      id="mardown"
    >{slug.slug}{res}</div>
  )
}

export default page
