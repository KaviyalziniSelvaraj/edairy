create table dbo.authenpage(
id int not null identity(1,1),
username varchar(20) not null,
password nchar(20) not null,
isactive bit not null,
PRIMARY KEY(id)
);
create table dbo.product(
id int not null identity(1,1),
userid int not null ,
proname varchar(20) not null,
onstack int not null,
price int,
isactive bit not null,
PRIMARY KEY(id)
);

