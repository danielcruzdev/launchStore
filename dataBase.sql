CREATE TABLE "products" (
  "id" INT PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "name" varchar(max),
  "description" varchar(max),
  "old_price" int,
  "price" int,
  "quantity" int,
  "status" int,
  "created_at" datetime2 DEFAULT 'now()',
  "updated_at" datetime2 DEFAULT 'now()'
);

CREATE TABLE "categories" (
  "id" INT PRIMARY KEY,
  "name" varchar(max)
);

CREATE TABLE "files" (
  "id" INT PRIMARY KEY,
  "name" varchar(max),
  "path" varchar(max),
  "product_id" int
);

CREATE TABLE "users" (
  "id" INT PRIMARY KEY,
  "name" varchar(max) NOT NULL,
  "email" varchar(max) UNIQUE NOT NULL,
  "password" varchar(max) NOT NULL,
  "cpg_cnpj" varchar(max) UNIQUE NOT NULL,
  "cep" varchar(max),
  "address" varchar(max),
  "created_at" datetime2 DEFAULT 'now()',
  "updated_at" datetime2 DEFAULT 'now()'
);
-- Foreign KEYS

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id")

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

--CREATE PROCEDURE 
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS
 BEGIN DECLARE @$$
	BEGIN
  	SET @NEW.updated.at = GETDATE()
RETURN NULL;
END;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql

--CREATE TRIGGERS -- AUTO UPDATE PRODUCTS
CREATE TRIGGER set_timestamp ON products
INSTEAD OF UPDATE
  AS
EXECUTE PROCEDURE trigger_set_timestamp();

--CREATE TRIGGERS -- AUTO UPDATE USERS
CREATE TRIGGER set_timestamp ON users
INSTEAD OF UPDATE
  AS
EXECUTE PROCEDURE trigger_set_timestamp();