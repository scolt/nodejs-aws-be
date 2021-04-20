drop table if exists products;
drop table if exists stocks;

create table products (
    id uuid,
    title varchar(255),
    image varchar(255),
    description text,
    price numeric,
    unique (id)
);

create table stocks (
    id uuid,
    count integer,
    product_id uuid,
    CONSTRAINT fk_products
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        on DELETE CASCADE
        on UPDATE CASCADE
);


INSERT INTO products(id, title, image, description, price) VALUES(
'97ff7f2e-7f8c-4a45-89d5-ebd35ee50b35','La Belle Russet',
'https://www.potatogrower.com/Images/gallery/8880_600.jpg',
'Russet. Thick skin with light and fluffy center',
56
),
(
'b06d0b01-ea4d-40ac-8ce7-d110d747fd96','Red Scarlet',
'https://agrobelarus.com/uploads/products/belarus/kartofel/red_scarlet/4.jpg',
'Red. Thin skin and stays firm throughout cooking',
71
),
(
'393af941-2772-4fe5-bc6c-d360cf9032ab','Yukon Gold',
'http://www.valleyspuds.com/wp-content/uploads/Yukon-Gold-Potatoes-500x333.jpg',
'Yellow. Buttery flavor with a creamy texture',
108
),
(
'ef4519c1-abbd-42b6-b06d-3bc2c85b8492','Riverford',
'https://www.georgeperry.co.uk/images/P/whitepotato.jpg',
'White. Thin skin with a nutty flavor and stays firm throughout cooking',
113
),
(
'565e0d6d-d132-4bea-9bbd-ebb0d0193a13','Majesty',
'https://www.specialtyproduce.com/sppics/641.png',
'Purple. Medium skin with an earthy flavor and vibrant color',
64
),
(
'6c1ea53a-f8db-4580-8a37-3fe30ccc8c12','Russian Banana',
'https://www.specialtyproduce.com/sppics/133.png',
'Fingerling. Nutty and buttery flavor with a firm texture',
47
),
(
'501cc21a-fcd6-4870-8711-3b855e46bf36','Baby Dutch',
'https://cdn.shopify.com/s/files/1/0336/7167/5948/products/130-2_400x400.jpg?v=1583843577',
'Petite',
55
);

INSERT INTO stocks(id, product_id, count)
VALUES('501cc21a-fcd6-4870-8711-3b855e46bf36', '97ff7f2e-7f8c-4a45-89d5-ebd35ee50b35', 2),
      ('6c1ea53a-f8db-4580-8a37-3fe30ccc8c12', 'b06d0b01-ea4d-40ac-8ce7-d110d747fd96', 5),
      ('565e0d6d-d132-4bea-9bbd-ebb0d0193a13', '393af941-2772-4fe5-bc6c-d360cf9032ab', 99),
      ('393af941-2772-4fe5-bc6c-d360cf9032ab', 'ef4519c1-abbd-42b6-b06d-3bc2c85b8492', 14),
      ('b06d0b01-ea4d-40ac-8ce7-d110d747fd96', '565e0d6d-d132-4bea-9bbd-ebb0d0193a13', 6),
      ('97ff7f2e-7f8c-4a45-89d5-ebd35ee50b35', '6c1ea53a-f8db-4580-8a37-3fe30ccc8c12', 147),
      ('ef4519c1-abbd-42b6-b06d-3bc2c85b8492', '501cc21a-fcd6-4870-8711-3b855e46bf36', 1);



