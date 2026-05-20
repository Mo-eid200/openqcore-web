import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

// Simple custom Switch component
type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    children?: React.ReactNode;
};

function Switch({ checked, onChange, className = '', children }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={className}
        >
            {children}
        </button>
    );
}

export function NotificationSettings() {
    const [emailNotif, setEmailNotif] = React.useState(true);
    const [agentNotif, setAgentNotif] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Notifications</span>
            </CardHeader>
            <CardContent>
                <div className="space-y-5 max-w-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">Email me on API usage events</span>
                        <Switch
                            checked={emailNotif}
                            onChange={setEmailNotif}
                            className={`${emailNotif ? 'bg-[#d4af37]' : 'bg-slate-600'
                                } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                        >
                            <span
                                className={`${emailNotif ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400">Notify on agent errors and downtime</span>
                        <Switch
                            checked={agentNotif}
                            onChange={setAgentNotif}
                            className={`${agentNotif ? 'bg-[#d4af37]' : 'bg-slate-600'
                                } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                        >
                            <span
                                className={`${agentNotif ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}