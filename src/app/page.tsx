'use client'
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { z } from "zod"
import { UploadButton } from "@/components/UploadButton";
import { FileCard } from "@/components/FileCard";

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

  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Files</h1>
          <UploadButton/>
      </div>

        <div className="grid grid-cols-4 gap-4">
          {files?.map((file) => {
            return (
              <FileCard key={file._id} file={file}/>
            )
          })}
        </div>
    </main>
  );
}
