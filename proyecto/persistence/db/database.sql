CREATE DATABASE  IF NOT EXISTS smdb;

USE smdb;

CREATE TABLE IF NOT EXISTS title_basics(
	tconst VARCHAR(15),
	title_type VARCHAR(255),
    primary_title VARCHAR(255),
    original_title VARCHAR(255),
    is_adult BOOLEAN,
	start_year INT,
    end_year INT,
	runtime_minutes INT,
	genres VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS name_basics(
	nconst VARCHAR(15),
	primary_name VARCHAR(255),
	birth_year INT,
	death_year INT,
	primary_profession VARCHAR(255),
    known_for_titles VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS title_crew(
	tconst VARCHAR(15),
	directors VARCHAR(255),
	writers VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS title_principals(
	tconst VARCHAR(15),
	ordering INT,
	nconst VARCHAR(15),
	category VARCHAR(255),
	job VARCHAR(255),
    characters VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS title_ratings(
	tconst VARCHAR(15),
	average_rating DECIMAL(3,1),
	num_votes INT
);
--Defina la ruta donde guarda los datasets
LOAD DATA
INFILE 'path/title_basics.csv'
INTO TABLE title_basics 
FIELDS TERMINATED BY '`'
IGNORE 1 ROWS;

LOAD DATA
INFILE 'path/name_basics.csv'
INTO TABLE name_basics 
FIELDS TERMINATED BY '	'
IGNORE 1 ROWS;

LOAD DATA
INFILE 'path/title_crew.csv'
INTO TABLE title_crew 
FIELDS TERMINATED BY '	'
IGNORE 1 ROWS;

LOAD DATA
INFILE 'path/title_principals.csv'
INTO TABLE title_principals 
FIELDS TERMINATED BY '	'
IGNORE 1 ROWS;

LOAD DATA
INFILE 'path/title_ratings.csv'
INTO TABLE title_ratings 
FIELDS TERMINATED BY '	'
IGNORE 1 ROWS;

CREATE TABLE IF NOT EXISTS users(
	id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	username VARCHAR(40),
	pass VARCHAR(60),
	full_name VARCHAR(60),
	email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users_ratings(
	id_user INT,
	tconst VARCHAR(15),
	rating INT,
	favorite TINYINT,
	state VARCHAR(20)
);

ALTER TABLE title_basics ADD INDEX (tconst);

ALTER TABLE title_basics  
ADD FULLTEXT(primary_title);
ALTER TABLE title_basics  
ADD FULLTEXT(genres);

ALTER TABLE name_basics ADD INDEX (nconst);

ALTER TABLE title_crew ADD INDEX (tconst);

ALTER TABLE title_principals ADD INDEX (tconst);