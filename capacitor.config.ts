import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "com.minotstate.csclub",
    appName: "CS Club",
    webDir: "out",
    server: {
        androidScheme: "https",
    },
    plugins: {
        // Add plugin configurations here
    },
}

export default config