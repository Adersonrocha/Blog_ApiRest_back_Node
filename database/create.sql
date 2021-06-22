create schema blog;

create table blog.post (
    id serial primary key,
    title  text not null,
    contente text not null,
    date timestamp default now()
);