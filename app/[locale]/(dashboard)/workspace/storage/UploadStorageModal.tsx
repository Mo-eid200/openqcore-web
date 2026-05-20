import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function UploadStorageModal({ open, onClose, onUpload }: {
    open: boolean;
    onClose: () => void;
    onUpload: (file: { name: string; type: string; size: string; bucket: string }) => void;
}) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [size, setSize] = useState("");
    const [bucket, setBucket] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div className="w-full max-w-md" onClick={e => e.stopPropagation()}>
                <Card className="relative shadow-2xl rounded-2xl">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-white">Upload File</span>
                            <button className="text-slate-400 hover:text-[#d4af37]" onClick={onClose}>×</button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                onUpload({ name, type, size, bucket });
                                setName(""); setType(""); setSize(""); setBucket("");
                                onClose();
                            }}
                            className="space-y-5"
                        >
                            <Input placeholder="File name" value={name} onChange={e => setName(e.target.value)} required />
                            <Input placeholder="Type (PDF, txt, vec...)" value={type} onChange={e => setType(e.target.value)} required />
                            <Input placeholder="Size (e.g. 24MB)" value={size} onChange={e => setSize(e.target.value)} required />
                            <Input placeholder="Bucket" value={bucket} onChange={e => setBucket(e.target.value)} required />
                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                                <Button type="submit" variant="primary">Upload</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}