"use client"
import { Label } from "recharts"
import { Card } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { ScrollArea } from "../ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"


export const Todolist = () => {
    const [date, setdate] = useState(new Date())
    const [open, setopen] = useState(false)
    return (
        <div>
            <h1 className="text-lg mb-3">TodoList</h1>
            <Popover open={open} onOpenChange={setopen}>
                <PopoverTrigger asChild>
                    <Button className="w-full">
                        <CalendarIcon></CalendarIcon>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setdate}
                        className="rounded-md border shadow-sm"
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>
            <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" defaultChecked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="item-1" checked>

                            </Checkbox>
                            <label htmlFor="item-1" className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </label>
                        </div>

                    </Card>
                    {/* <div className="flex items-start gap-3">
                        <Checkbox id="terms-2" defaultChecked />
                        <div className="grid gap-2">
                            <Label htmlFor="terms-2">Accept terms and conditions</Label>
                            <p className="text-muted-foreground text-sm">
                                By clicking this checkbox, you agree to the terms and conditions.
                            </p>
                        </div>
                    </div> */}

                    {/* <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                        <Checkbox
                            id="toggle-2"
                            defaultChecked
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                        <div className="grid gap-1.5 font-normal">
                            <p className="text-sm leading-none font-medium">
                                Enable notifications
                            </p>
                            <p className="text-muted-foreground text-sm">
                                You can enable or disable notifications at any time.
                            </p>
                        </div>
                    </Label> */}
                </div>
            </ScrollArea>
        </div>
    )
}
