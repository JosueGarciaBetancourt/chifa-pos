// scan-unsafe-props.js
const fs = require("fs");
const path = require("path");

const targetDir = "./src"; // Cambia si tu código está en otro directorio
const fileExtensions = [".js", ".jsx", ".ts", ".tsx"];
const regexMapOrFilter = /\b([a-zA-Z0-9_]+)\.(map|filter)\(/g;
const regexDestructuredProps = /(?:const|function).*?{[^}]*([a-zA-Z0-9_]+)[^}]*}.*?[=|{]/gs;

const scanDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (fileExtensions.includes(path.extname(file))) {
      scanFile(fullPath);
    }
  }
};

const scanFile = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");

  const usedProps = new Set();
  let match;

  // Buscar todos los .map() y .filter()
  while ((match = regexMapOrFilter.exec(content)) !== null) {
    usedProps.add(match[1]);
  }

  if (usedProps.size === 0) return;

  // Buscar props destructuradas
  const declaredProps = new Set();
  const destructureMatches = content.matchAll(regexDestructuredProps);
  for (const destructure of destructureMatches) {
    if (destructure[1]) declaredProps.add(destructure[1]);
  }

  // Verificar props no protegidas
  const unprotected = [...usedProps].filter((prop) => {
    return declaredProps.has(prop) === false;
  });

  if (unprotected.length > 0) {
    console.log(`\n📄 Archivo: ${filePath}`);
    unprotected.forEach((prop) => {
      console.warn(` ⚠️  Posible uso inseguro de "${prop}.map" o "${prop}.filter" sin verificación`);
    });
  }
};

// Iniciar análisis
console.log("🔍 Analizando uso inseguro de props.map/filter...");
scanDirectory(targetDir);
