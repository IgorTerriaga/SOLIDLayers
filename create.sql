drop table igor.installment;
drop table igor.transaction;
create table igor.transaction (
    code text primary key,
    amount numeric,
    number_installment integer,
    payment_method text,
    date timestamp default now ()
);

create table igor.installment (
    code text references igor.transaction (code),
    number integer,
    amount numeric,
    primary key (code, number)
);