import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import React, {useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uploadImagesDataAsync } from "../../redux/slices/imagesSlice"
import { useNavigate } from "react-router-dom"

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export function InputForm() {

    const [filesArray, setFilesArray] = useState([])
    const dispatch = useDispatch()
    const anchor = useRef(null)
    const navigate = useNavigate()
    
    
    const form = useForm ({
        resolver: zodResolver(FormSchema),
    })
        
    
    
    function handleSetFile(event) {
        const files = event.target.files;

        if (files?.length) {
            setFilesArray([...files]);
        }
    }
    
    
    function onSubmit(e) {

        try {
            dispatch(uploadImagesDataAsync(filesArray));
            anchor.current.value = [];
            
        }
        catch (error) {
            console.error("Error handling form submission:", error);
        }
        
        navigate("/result");
        e.preventDefault();
    }


    return (
        <Form {...form}>
            <form className="flex flex-col justify-center w-2/5 mx-20 space-y-6 border-current rounded-lg">

                <div className="flex ">
                    <FormField
                        control={form.control}
                        name="username"
                        render={() => (
                            <FormItem>
                                <FormLabel>Загрузите файл</FormLabel>
                                <FormControl>
                                    <input ref={anchor} multiple type='file' accept=".jpg" onChange={handleSetFile} placeholder="shadcn" className="flex h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-end w-3/5">
                        <button onClick={onSubmit} type="submit" className="inline-flex items-center justify-center h-10 px-4 py-2 ml-4 text-sm font-medium transition-colors rounded-md whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90">Submit</button>
                    </div>    
                </div>
                
                
            </form>
        </Form>
    )
}