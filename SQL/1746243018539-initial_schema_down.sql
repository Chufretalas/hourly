DROP INDEX IF EXISTS idx_user_id_activity;
DROP INDEX IF EXISTS idx_user_id_project;
DROP INDEX IF EXISTS idx_user_id_client;
DROP INDEX IF EXISTS idx_project_id;
DROP INDEX IF EXISTS idx_client_id;

DROP TABLE IF EXISTS Activities;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Clients;
DROP TABLE IF EXISTS Users;