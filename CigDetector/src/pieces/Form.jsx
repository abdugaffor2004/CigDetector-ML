import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function InputForm() {

    const { toast } = useToast()
    const [file, setFile] = useState([])
    
    const form = useForm ({
            resolver: zodResolver(FormSchema),
    })
        
    
    
    function handleSetFile(event) {
        const files = event.target.files;

        if (files?.length) {
            setFile([...files]);
        }
    }
    
    
    function onSubmit(e) {
        console.log(file);
        e.preventDefault();
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="w-full p-4 mt-2 rounded-md bg-slate-950">
                    <code className="text-white">{JSON.stringify( {fileName: file.name, lastModifiedDate: file.lastModifiedDate}, null, 2)}</code>
                </pre>
            ),
        })

        
    }

    return (
        <Form {...form}>
            <form /* onSubmit={form.handleSubmit(onSubmit)} */ className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={() => (
                        <FormItem>
                            <FormLabel>Загрузите файл</FormLabel>
                            <FormControl>
                                <input multiple type='file' accept=".jpg" onChange={handleSetFile} placeholder="shadcn" className="flex h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <button onClick={onSubmit} type="submit" className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90">Submit</button>
            </form>
        </Form>
    )
}