export interface AppearanceSettingsData {
    theme: "system" | "light" | "dark";
    accentColor: string;      // Hex/RGB/CSS var
    fontSize: "small" | "normal" | "large";
}

export interface SecuritySettingsData {
    passwordSet: boolean;
    twoFactorEnabled: boolean;
    lastPasswordChange?: string;
    devices: { id: string; name: string; lastActive: string }[];
}

export interface PreferencesData {
    language: string;
    notifications: boolean;
    aiSuggestions: boolean;
    compactMode: boolean;
}