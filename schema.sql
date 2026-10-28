-- Glory Verse - Supabase schema (initial)
create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  country_code text,
  region text,
  level int default 1,
  xp int default 0,
  energy numeric default 100,
  health numeric default 100,
  gold numeric default 0,
  euro numeric default 0,
  svct numeric default 0,
  ruf numeric default 0,
  diamond numeric default 0,
  usdt numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists businesses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text not null,
  profit_per_second numeric not null default 0,
  base_price_gold numeric not null default 0,
  created_at timestamptz default now()
);

create table if not exists user_businesses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  business_id uuid references businesses(id) on delete cascade,
  quantity int not null default 1,
  purchased_at timestamptz default now()
);

alter table profiles enable row level security;
alter table businesses enable row level security;
alter table user_businesses enable row level security;

create policy "profiles are viewable by owner" on profiles
  for select using (auth.uid() = id);
create policy "profiles are updatable by owner" on profiles
  for update using (auth.uid() = id);

create policy "businesses readable by all authenticated" on businesses
  for select using (auth.role() = 'authenticated');

create policy "user_businesses owned" on user_businesses
  for all using (auth.uid() = user_id);
