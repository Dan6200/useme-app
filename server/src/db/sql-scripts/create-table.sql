drop table if exists user_account cascade;

create table if not exists user_account (
	user_id					bigserial 			primary key,
	first_name				varchar(30)		not null,
	last_name				varchar(30)		not null,
	email					varchar(320)	unique
	check (email ~* '^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'),			
	phone		 			varchar(40)		unique
	check (phone ~* '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$'),			
	password				bytea			not null,
	dob						date			not null,
	check (current_date - dob > 12)
);

create table if not exists passenger (
	passenger_id			bigint 		primary key	references	user_account	on	delete	cascade
);


create table if not exists driver (
	driver_id		bigserial 		primary key	references	user_account	on	delete	cascade
	-- Create a constraint that excludes drivers under 18 
);


drop table if exists vehicle cascade;

create table if not exists vehicle (
	vehicle_id			bigserial			primary key,
	title				varchar,
	category			varchar,
	description			varchar,
	list_price			numeric(19,4),
	net_price			numeric(19,4),
	driver_id 			bigint			not null 		unique 		references	driver	on	delete	cascade,
	quantity_available	int					not null
);


drop table if exists vehicle_image cascade;

create table if not exists vehicle_media (
	vehicle_id					bigint				primary key		references	vehicle	on	delete	cascade,
	filename 					varchar 			not null,
	filepath 					varchar 			not null,
	filesize 					int,
	description					varchar
);

drop table if exists driver_review cascade;

create table if not exists driver_review (
	review_id				bigserial			primary key,
	driver_id				bigint				not	null		references	driver on delete cascade,
	passenger_id				bigint				not null		references	passenger on delete cascade,
	transaction_id			bigint				not null		references	transaction on delete cascade,
	rating					numeric(3,2)	not null,
	passenger_remark			varchar
);
