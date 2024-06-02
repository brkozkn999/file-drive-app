import { FileTextIcon, GanttChartIcon, ImageIcon, MoreVertical, Star, StarHalf, TextIcon, TrashIcon } from "lucide-react"
import { Doc, Id } from "../../convex/_generated/dataModel"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { ReactNode, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"

function FileCardActions({file, isFavorited}: {file: Doc<'files'>, isFavorited:boolean}) {
    const toggleFavorite = useMutation(api.file.toggleFavorite);
    const deleteFile = useMutation(api.file.deleteFile);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    return (
        <>
        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() =>{
                deleteFile({
                    fileId: file._id
                });
            }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
        

        <DropdownMenu>
        <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem onClick={() =>
                toggleFavorite({fileId: file._id})}
                    className="flex gap-1 items-center cursor-pointer">
                        {isFavorited ? 
                        <div className="flex gap-1 items-center">
                            <StarHalf className="w-4 h-4"/> Unfavorite
                        </div>
                        :
                        <div className="flex gap-1 items-center">
                            <Star className="w-4 h-4"/> Favorite
                        </div>
                        }
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => setIsConfirmOpen(true)}
                    className="flex gap-1 text-red-600 items-center cursor-pointer">
                    <TrashIcon className="w-4 h-4"/> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}

function getFileUrl(fileId: Id<'_storage'>) : string {
    return ``;
}

export function FileCard({file, favorites}: {file: Doc<'files'>, favorites: Doc<'favorites'>[]}) {
    const types = {
        image: <ImageIcon/>,
        pdf: <TextIcon />,
        csv: <GanttChartIcon />,
    } as Record<Doc<'files'>['type'], ReactNode>;

    const isFavorited = favorites.some((favorite) => favorite.fileId === file._id);

    return (
        <Card className='shadow-md'>
        <CardHeader className="relative">
            <CardTitle className="flex gap-2">
                <div className="flex justify-center">{types[file.type]}</div>
                {file.name}
            </CardTitle>
            <div className="absolute top-2 right-2">
                <FileCardActions isFavorited={isFavorited} file={file}/>
            </div>
            <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] flex justify-center items-center">
            {file.type === 'image' && (
                <></>
            )}
            {file.type === 'csv' && (
                <GanttChartIcon className="w-20 h-20"/>
            )}
            {file.type === 'pdf' && (
                <FileTextIcon className="w-20 h-20"/>
            )}

        </CardContent>
        <CardFooter className="flex justify-center items-center">
            <Button onClick={() => {
                window.open(getFileUrl(file.fileId), '_blank');
            }}>Download</Button>
        </CardFooter>
        </Card>
    )
}