"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import ReciterForm from "./ReciterForm"

const ReciterModalForm = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="space-x-2">
          <Plus size={14} />
          <span>Recitateur</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recitateur</DialogTitle>
          <DialogDescription>
            Creer ou modifier les informations d&apos;un recitateur.
          </DialogDescription>
        </DialogHeader>
        <ReciterForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default ReciterModalForm
