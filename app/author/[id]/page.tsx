import { getAuthorById } from "@/actions/api/client"

import InfiniteList from "@/components/InfiniteList"
import XassidaList from "@/components/XassidaList"

import Biography from "../components/Biography"

interface Props {
  params: { id: number }
}

export default async function AuthorPage({ params }: Props) {
  const { id } = params
  const data = await getAuthorById(id)
  return (
    <div>
      <div>
        <Biography data={data} />
      </div>
      <div className="container">
        <h3 className="my-2 text-lg font-bold uppercase">Bibliographie</h3>
        <InfiniteList
          params={{ "author.id": id }}
          Component={XassidaList}
          type="xassida"
        />
      </div>
    </div>
  )
}
