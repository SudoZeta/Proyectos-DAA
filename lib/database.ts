import Loki from "lokijs";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "database.db");

declare global {
  // eslint-disable-next-line no-var
  var __lokiDb: Loki | undefined;
  // eslint-disable-next-line no-var
  var __solicitudesInit: Promise<Collection<any>> | undefined;
}

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
}

function loadDb(db: Loki) {
  return new Promise<void>((resolve, reject) => {
    db.loadDatabase({}, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export async function getSolicitudesCollection(): Promise<Collection<any>> {
  ensureDataDir();

  if (!globalThis.__lokiDb) {
    globalThis.__lokiDb = new Loki(dbPath, {
      autosave: true,
      autosaveInterval: 4000,
    });
  }

  const db = globalThis.__lokiDb;

  if (!globalThis.__solicitudesInit) {
    globalThis.__solicitudesInit = (async () => {
      await loadDb(db);

      const col =
        db.getCollection("solicitudes") ||
        db.addCollection("solicitudes", {
          indices: ["id", "userId"],
        });

      return col;
    })();
  }

  return globalThis.__solicitudesInit;
}