/* eslint-disable tailwindcss/no-contradicting-classname */
"use client"

import { useEffect, useRef } from "react"
import { getAudios } from "@/actions/api/client"
import { playerStore } from "@/zustand/playerStore"
import { navbarSelector } from "@/zustand/slices/navbar"
import { useStore } from "@/zustand/store"
import { Download, Pause, Play } from "lucide-react"
import { Virtuoso } from "react-virtuoso"

import { playingType } from "@/types/player"
import { Xassida } from "@/types/supabase"
import { BASE_URL } from "@/lib/api"
import { cn, unslugify } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BismillahVariant } from "@/components/Bismillah"

import Chapter from "./Chapter"
import ChapterSelect from "./ChapterSelect"

interface Props {
  xassida: Xassida
}

const Reader = ({ xassida }: Props) => {
  const { visible } = useStore(navbarSelector)
  const virtuoso = useRef(null)

  const [isCurrentPlaying, playXassida, toggle, data] = playerStore((state) => [
    state.isCurrentPlaying,
    state.playXassida,
    state.toggle,
    state.audioData,
  ])

  const addToHistory = useStore((state) => state.addToHistory)

  // add xassida to reading history
  useEffect(() => {
    addToHistory(xassida)
  }, [addToHistory, xassida])

  const reciters = xassida?.reciter || []
  const chapters: any[] = xassida.chapter
    .sort((a, b) => a.number - b.number)
    .map((chp) => chp.id)

  const currentPlaying = isCurrentPlaying(xassida.id, playingType.Xassida)
  const playDisabled = reciters.length ? false : true

  const handlePlay = async () => {
    if (data?.xassida == xassida.id) toggle()
    else {
      const [audio] = await getAudios({
        reciter_id: reciters[0].id,
        xassida_id: xassida.id,
      })
      playXassida(audio)
    }
  }

  return (
    <div>
      <div
        className={cn(
          "sticky z-30 flex w-full items-center justify-between bg-background p-1 px-4 shadow-md duration-200 dark:bg-muted",
          visible ? "top-[56px]" : "top-0"
        )}
      >
        <ChapterSelect virtuoso={virtuoso} chapters={chapters} />
        <div>
          <a
            target="_blank"
            href={`${BASE_URL}pdf/${xassida.id}`}
            rel="noreferrer"
          >
            <Download size={20} />
          </a>
        </div>
      </div>
      <div className="container">
        <header className="flex flex-col items-center justify-center py-3">
          <h3 className="text-2xl capitalize">{unslugify(xassida.name)}</h3>
          <div className="flex w-full flex-col items-center py-4">
            <BismillahVariant />
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p className="text-muted-foreground">xassida par:</p>
                <p className="capitalize">{unslugify(xassida.author.name)}</p>
              </div>
              {!playDisabled && (
                <Button
                  disabled={playDisabled}
                  className="text-vert"
                  onClick={handlePlay}
                  variant="outline"
                >
                  {currentPlaying ? (
                    <Pause className="mr-2 size-4" />
                  ) : (
                    <Play className="mr-2 size-4" />
                  )}
                  <span>{currentPlaying ? "Arreter" : "Demarrer"} Audio</span>
                </Button>
              )}
            </div>
          </div>
        </header>
        <div className="font-amiri font-hafs font-lateef font-scheherazade font-warsh">
          <Virtuoso
            ref={virtuoso}
            useWindowScroll
            increaseViewportBy={1000}
            data={chapters}
            itemContent={(_, chap) => <Chapter chap={chap} />}
          />
        </div>
      </div>
    </div>
  )
}

export default Reader
