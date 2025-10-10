"use client";

import { ReactNode } from "react";
import Provider from "./provider";

// Replaced ConvexProvider with direct Provider usage since we've migrated to MongoDB
export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <Provider>
            {children}
        </Provider>
    );
}