// components/storage/types.ts
export type Bucket = {
    name: string,
    region: string,
    files: number,
    usage: string,
    status: "active" | "disabled"
};

export type File = {
    id: string;
    name: string;
    type: string;
    size: string;
    updated: string;
    bucket: string;
    status: "available" | "processing" | "error";
};