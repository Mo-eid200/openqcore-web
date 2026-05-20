import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function CreateProjectModal({
    open,
    onClose,
    onCreate,
}: {
    open: boolean;
    onClose: () => void;
    onCreate: (args: { name: string; description: string }) => void;
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div
                className="w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <Card className="relative shadow-2xl">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-white">Create New Project</span>
                            <button className="text-slate-400 hover:text-[#d4af37]" onClick={onClose}>×</button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                onCreate({ name, description });
                                setName("");
                                setDescription("");
                                onClose();
                            }}
                            className="space-y-5"
                        >
                            <Input
                                placeholder="Project name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <Input
                                placeholder="Project description (optional)"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                                <Button type="submit" variant="primary">Create</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}