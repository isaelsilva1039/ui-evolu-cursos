"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "instructor",
    label: "Instructor",
  },
  {
    value: "student",
    label: "Student",
  },
  {
    value: "affiliate",
    label: "Affiliate",
  },
]

export function UserRoleSwitcher() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("admin")
  const router = useRouter()

  // Set user role in localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole")
    if (storedRole) {
      setValue(storedRole)
    } else {
      localStorage.setItem("userRole", value)
    }
  }, [value])

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    localStorage.setItem("userRole", currentValue)
    setOpen(false)

    // Redirect to the appropriate dashboard based on role
    router.push("/dashboard")
    // Force a refresh to update the sidebar
    window.location.reload()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[180px] justify-between">
          {value ? roles.find((role) => role.value === value)?.label : "Select role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Search role..." />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem key={role.value} value={role.value} onSelect={handleSelect}>
                  <Check className={cn("mr-2 h-4 w-4", value === role.value ? "opacity-100" : "opacity-0")} />
                  {role.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
