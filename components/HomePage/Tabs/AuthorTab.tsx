"use client"

import React, { useState } from "react"
import { Author } from "@/types"
import useSWRImmutable from "swr/immutable"

import { getAuthor } from "@/lib/api"
import { TARIHA } from "@/lib/constants"
import AuthorList from "@/components/AuthorList"
import InfiniteList from "@/components/InfiniteList"

import { Filter } from "./MultiFilter"

const AuthorTab = () => {
  const [tariha, setTariha] = useState("tidjan")
  return (
    <div>
      <div className="flex justify-end">
        <div className="flex items-center space-x-2">
          <Filter
            name="Tariha"
            list={TARIHA}
            selected={tariha}
            setSelected={setTariha}
          />
        </div>
      </div>
      <InfiniteList
        params={{ tariha }}
        getFunction={getAuthor}
        Component={AuthorList}
      />
    </div>
  )
}

export default React.memo(AuthorTab)
