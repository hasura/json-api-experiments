import TypescriptOAS, { createProgram } from "ts-oas";
import fs from "fs";
import path from "path";

const OUT_FILE_DIR = "./build";
const OUT_FILE_NAME = "openapi_schema.json";

// create a Typescript program. or any generic ts program can be used.
const tsProgram = createProgram(
    ["./src/interfaces.ts"],
    {
        strictNullChecks: true,
    },
    path.resolve()
);

// initiate the OAS generator.
const tsoas = new TypescriptOAS(tsProgram, {
    ref: true,
});

// get the complete OAS. determine which types must be used for API specs by
// passing type names(Regex/exact name)
const specObject = tsoas.getOpenApiSpec([/API$/]); // /API$/ -> all types that ends with "API"
const spec = JSON.stringify(specObject, null, 4)

// console.log(spec);

if (!fs.existsSync(OUT_FILE_DIR)) {
    fs.mkdirSync(OUT_FILE_DIR);
}
fs.writeFileSync(path.join(OUT_FILE_DIR, OUT_FILE_NAME), spec);
