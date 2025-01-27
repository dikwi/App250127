create type item_category as enum ('MEDICINE', 'SUPPLY', 'EQUIPMENT', 'OTHER');

create table items (
  id bigint primary key generated always as identity,
  name varchar not null,
  generic varchar not null,
  phone varchar,
  type item_category not null,
  active boolean default true,
  hf bigint references hfs(id),
  created_at timestamptz default now()
);
