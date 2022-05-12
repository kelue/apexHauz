# DATABASE MIGRATION GUIDE

 1. Create Database.
 2. Configure your environment (.env) file to include your database credentials.
 3. Create migrations for each table.
 4. Configure your table migrations.
 5. Migrate your tables into the database

## Create Database

 Create your **mysql** database for the project using the command line or a GUI like *phpmyadmin*.

> CREATE DATABASE dbName;

Change 'dbName' to the name you want to give your database.

    example of creating a database named 'sidehustlerestapi'
    
    CREATE DATABASE sidehustlerestapi;

## Configure your '.env' file

  Create a '.env' file in the project root folder (i.e. directly inside apexHauz folder) and configure it with your database credentials as follow:

> .env
> DB_HOST=
> DB_USERNAME=
> DB_PASSWORD=
> DATABASE=

Fill your database credentials appropriately and save the file.

    .env example
    DB_HOST=localhost
    DB_USERNAME=ahmadinjo
    DB_PASSWORD=MyVery@Password1
    DATABASE=sidehustlerestapi

## Create Table Migrations

To create migrations for table basically means you're creating a template for the table structure (i.e. the columns, their data types, size/length, default value etc.). Make sure you run `npm install` so the necessary node modules (mysql and mysql-migrations) are installed.

NOTE: mysql-migrations is to be installed as a dev-dependency module. For example `npm i -D mysql-migrations`.

Use the following template to create migrations for a table using the command line:

> node migration add migration create_table_tableName

Change 'tableName' to the name of the table you'd like to create a migration for. For example, to create a migration for the users table, the following command used:

    node migration add migration create_table_users
NOTE: Make sure you have the migration.js file in your project root folder and cd into the project root folder before running the command.

## Configure Table Migration

After creating your migrations successfully, you should find your migration files in the 'migrations' folder which should be in the 'src' folder in the project root folder i.e. `apexHauz->src->migrations`.

You can configure your table by specifying the normal sql syntax for creating tables as a string in the 'up' option and the syntax for dropping tables in the 'down' option like:

    example for users table - 1652114005124_create_table_users.js
    module.exports  = {
    "up":  `CREATE TABLE users (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,email VARCHAR(255) NOT NULL UNIQUE,
     first_name VARCHAR(150) NOT NULL,
     last_name VARCHAR(150) NOT NULL,
     password VARCHAR(250) NOT NULL,
     phone VARCHAR(20) NOT NULL,
     address VARCHAR(255),
     is_admin BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`,
    "down":  "DROP TABLE users"
    }

## Migrate Tables into Database

All that's left after creating and configuring your migrations is to migrate the tables into your database. To get the tables migrated into your database run the following code in your command line:

    node migration up
NOTE: Run while you have cd into the project root folder.

After successfully running migrations, your database should now contain your tables as specified in the migrations and you can start using them to store data normally.
