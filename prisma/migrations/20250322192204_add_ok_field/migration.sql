-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "ok" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Verification" ("createdAt", "expiresAt", "id", "identifier", "updatedAt", "value") SELECT "createdAt", "expiresAt", "id", "identifier", "updatedAt", "value" FROM "Verification";
DROP TABLE "Verification";
ALTER TABLE "new_Verification" RENAME TO "Verification";
CREATE UNIQUE INDEX "Verification_value_key" ON "Verification"("value");
CREATE INDEX "Verification_identifier_idx" ON "Verification"("identifier");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
