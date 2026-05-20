import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function CreateApiKeyModal({
    open,
    onClose,
    onCreate,
}: {
    open: boolean;
    onClose: () => void;
    onCreate: (label: string) => void;
}) {
    const [label, setLabel] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="w-full max-w-md" onClick={e => e.stopPropagation()}>
                <Card className="relative shadow-2xl rounded-2xl">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-white">Create API Key</span>
                            <button className="text-slate-400 hover:text-[#d4af37]" onClick={onClose}>×</button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                onCreate(label);
                                setLabel("");
                                onClose();
                            }}
                            className="space-y-5"
                        >
                            <Input
                                placeholder="Label for this key"
                                value={label}
                                onChange={e => setLabel(e.target.value)}
                                required
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