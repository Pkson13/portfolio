import { titles } from "@/lib/blog"
import Link from "next/link"

const page = () => {
  return (
    <div className="max-w-2xl px-4 mx-auto mt-10">
      <h1 className="bebas-header text-center tracking-wide text-4xl">blog</h1>
      <div className="flex flex-col mt-5 gap-3.5">
        {
          titles.map((title, key) => {
            return (
              <div key={key} className="flex prose dark:prose-invert justify-between">
                <Link href={`blog/${title.file}`}>{title.title}</Link>
                <span className="text-sm">{title.date}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default page
