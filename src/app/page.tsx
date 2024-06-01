'use client'
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { z } from "zod"
import { UploadButton } from "@/components/UploadButton";
import { FileCard } from "@/components/FileCard";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z.custom<FileList>((val) => val instanceof FileList, 'Required')
  .refine((files) => files.length > 0, `Required`)
});

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.file.getFiles, orgId ? {orgId} : 'skip');
  const isLoading = files === undefined;
  return (
    <main className="container mx-auto pt-12">

      {files === undefined && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="w-32 h-32 animate-spin text-gray-500"/>
          <div className="text-2xl text-gray-500">Loading...</div>
        </div>
      )}

      {!isLoading && files.length === 0 && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Image src='/empty.svg'
            alt="an image of a picture and directory icon" width={200} height={200}/>
            <div className="text-2xl"> You have no files, upload one now! </div>
            <UploadButton/>
          </div>
        )}

        {!isLoading && files.length > 0 && (
              <>
                  <div className="flex justify-between items-center mb-8">
                  <h1 className="text-4xl font-bold">Your Files</h1>
                    <UploadButton/>
                </div>

                <div className="grid grid-cols-3 gap-4">
                {files?.map((file) => {
                  return (
                    <FileCard key={file._id} file={file}/>
                  )
                })}
                </div>
              </>
        )}
    </main>
  );
}
