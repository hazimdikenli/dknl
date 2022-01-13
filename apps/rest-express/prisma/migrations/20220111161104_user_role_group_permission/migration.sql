-- CreateTable
CREATE TABLE "GroupUser" (
    "group_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_by" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("group_id", "user_id")
);

-- CreateTable
CREATE TABLE "GroupRole" (
    "group_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_by" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("group_id", "role_id")
);

-- CreateTable
CREATE TABLE "Group" (
    "group_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group_name" TEXT NOT NULL,
    "group_description" TEXT,
    "email" TEXT,
    "created_by" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Permission" (
    "permission_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "permission_name" TEXT NOT NULL,
    "permission_description" TEXT NOT NULL,
    "parent_id" INTEGER,
    "created_by" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    PRIMARY KEY ("role_id", "permission_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role_name" TEXT NOT NULL,
    "role_description" TEXT NOT NULL,
    "created_by" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserRole" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "role_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_by" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "groups_group_name_unique" ON "Group"("group_name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permission_name_unique" ON "Permission"("permission_name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_unique" ON "Role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_name_unique" ON "User"("user_name");
