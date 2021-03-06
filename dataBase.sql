CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "name" text,
  "description" text,
  "old_price" int,
  "price" int,
  "quantity" int,
  "status" int,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text,
  "product_id" int
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpg_cnpj" text UNIQUE NOT NULL,
  "cep" text,
  "address" text,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp DEFAULT 'now()'
);

-- Connect Pg simple table
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
-- Table connect pg simple table 


CREATE INDEX "IDX_session_expire" ON "session" ("expire");
-- Foreign KEYS

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id")

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

--CREATE PROCEDURE 
CREATE FUNCTION trigger_set_timestamp()
RETURN TRIGGER AS $$
	BEGIN
  	NEW.updated.at = NOW()
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql

--CREATE TRIGGERS -- AUTO UPDATE PRODUCTS
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--CREATE TRIGGERS -- AUTO UPDATE USERS
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--Token password RECOVERY

ALTER TABLE "users" ADD COLUMN reset_token text;
ALTER TABLE "users" ADD COLUMN reset_token_expires text;


-- Delete de usuario em cascata

ALTER  TABLE "products"
DROP CONSTRAINT products_user_id_fkey,
ADD CONSTRAINT products_user_id_fkey
FOREIGN KEY ("user_id")
REFERENCES "users" ("id")
ON DELETE CASCADE;

ALTER  TABLE "files"
DROP CONSTRAINT files_product_id_fkey,
ADD CONSTRAINT files_product_id_fkey
FOREIGN KEY ("product_id")
REFERENCES "products" ("id")
ON DELETE CASCADE;