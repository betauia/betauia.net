import { execSync } from "child_process";

const env = process.env.ENV;

if (env === "production") {
    console.log("Environment is production. Running build...");
    execSync("npm run build", { stdio: "inherit" });
} else if (env === "development") {
    console.log("Environment is development. Running dev...");
    execSync("npm run dev", { stdio: "inherit" });
} else {
    console.error("Error: ENV variable must be set to 'production' or 'development'.");
    process.exit(1);
}
