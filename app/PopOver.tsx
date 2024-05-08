import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Set Time</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Set Time</h4>
                        <p className="text-sm text-muted-foreground">
                            Enter time in minutes.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Minutes</Label>
                            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
