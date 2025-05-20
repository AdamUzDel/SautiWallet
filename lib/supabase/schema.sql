-- SautiWallet Database Schema for Supabase

-- Enable RLS (Row Level Security)
alter default privileges revoke execute on functions from public;

-- Set up storage for profile images
insert into storage.buckets (id, name, public) values ('profile_images', 'profile_images', true);
create policy "Profile images are publicly accessible." on storage.objects for select using (bucket_id = 'profile_images');
create policy "Users can upload their own profile images." on storage.objects for insert with check (bucket_id = 'profile_images' AND auth.uid() = owner);
create policy "Users can update their own profile images." on storage.objects for update using (bucket_id = 'profile_images' AND auth.uid() = owner);
create policy "Users can delete their own profile images." on storage.objects for delete using (bucket_id = 'profile_images' AND auth.uid() = owner);

-- Create custom types
create type transaction_type as enum ('sent', 'received', 'paid');
create type transaction_status as enum ('pending', 'completed', 'failed');
create type account_type as enum ('mobile_money', 'bank', 'card');
create type group_role as enum ('Chairperson', 'Treasurer', 'Secretary', 'Member');

-- Create tables
-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text not null,
  last_name text not null,
  email text unique,
  phone text unique not null,
  address text,
  city text,
  country text,
  profile_image text,
  pin text, -- In production, this should be properly hashed
  language text not null default 'en',
  theme text not null default 'light',
  voice_assistant_id uuid,
  is_demo boolean default false,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Contacts table
create table public.contacts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  name text not null,
  phone text not null,
  email text,
  recent boolean default false,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  unique(user_id, phone)
);

-- Transactions table
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  recipient_id uuid references public.contacts,
  recipient_phone text,
  name text not null,
  amount numeric not null,
  type transaction_type not null,
  date date not null default current_date,
  time time not null default current_time,
  category text not null,
  description text,
  status transaction_status not null default 'completed',
  fee numeric default 0,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Savings Groups (SACCO) table
create table public.savings_groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  members_count integer not null default 0,
  total_saved numeric not null default 0,
  goal_amount numeric not null,
  goal_name text not null,
  next_meeting timestamp with time zone,
  progress integer not null default 0,
  is_active boolean not null default true,
  chairperson_id uuid references public.users,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Group Members table
create table public.group_members (
  user_id uuid references public.users not null,
  group_id uuid references public.savings_groups not null,
  role group_role not null default 'Member',
  contribution numeric not null default 0,
  joined_at timestamp with time zone default now() not null,
  primary key (user_id, group_id)
);

-- Group Discussions table
create table public.group_discussions (
  id uuid default gen_random_uuid() primary key,
  group_id uuid references public.savings_groups not null,
  author_id uuid references public.users not null,
  message text not null,
  created_at timestamp with time zone default now() not null
);

-- Voice Assistants table
create table public.voice_assistants (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  gender text not null,
  language text not null,
  preview text not null,
  created_at timestamp with time zone default now() not null
);

-- Notification Preferences table
create table public.notification_preferences (
  user_id uuid references public.users primary key,
  voice_notifications boolean not null default true,
  transaction_alerts boolean not null default true,
  marketing_messages boolean not null default false,
  push_enabled boolean not null default true,
  email_enabled boolean not null default true,
  sms_enabled boolean not null default true,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Security Settings table
create table public.security_settings (
  user_id uuid references public.users primary key,
  biometric_auth boolean not null default true,
  pin_required boolean not null default true,
  last_pin_change timestamp with time zone,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Connected Devices table
create table public.connected_devices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  device_name text not null,
  device_type text not null,
  last_active timestamp with time zone default now() not null,
  is_current_device boolean not null default false,
  location text,
  created_at timestamp with time zone default now() not null
);

-- Linked Accounts table
create table public.linked_accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users not null,
  account_type account_type not null,
  provider text not null,
  account_number text,
  is_connected boolean not null default true,
  last_sync timestamp with time zone default now(),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create RLS policies
-- Users table policies
create policy "Users can view their own profile." 
  on public.users for select 
  using (auth.uid() = id);

create policy "Users can update their own profile." 
  on public.users for update 
  using (auth.uid() = id);

-- Contacts table policies
create policy "Users can view their own contacts." 
  on public.contacts for select 
  using (auth.uid() = user_id);

create policy "Users can create their own contacts." 
  on public.contacts for insert 
  with check (auth.uid() = user_id);

create policy "Users can update their own contacts." 
  on public.contacts for update 
  using (auth.uid() = user_id);

create policy "Users can delete their own contacts." 
  on public.contacts for delete 
  using (auth.uid() = user_id);

-- Transactions table policies
create policy "Users can view their own transactions." 
  on public.transactions for select 
  using (auth.uid() = user_id);

create policy "Users can create their own transactions." 
  on public.transactions for insert 
  with check (auth.uid() = user_id);

-- Savings Groups policies
-- create policy "Users can view savings groups they are members  = user_id);

-- Savings Groups policies
create policy "Users can view savings groups they are members of." 
  on public.savings_groups for select 
  using (exists (
    select 1 from public.group_members 
    where group_members.group_id = id and group_members.user_id = auth.uid()
  ));

create policy "Chairpersons can update their savings groups." 
  on public.savings_groups for update 
  using (chairperson_id = auth.uid());

-- Group Members policies
create policy "Users can view group members of groups they belong to." 
  on public.group_members for select 
  using (exists (
    select 1 from public.group_members as gm 
    where gm.group_id = group_id and gm.user_id = auth.uid()
  ));

create policy "Users can join groups." 
  on public.group_members for insert 
  with check (user_id = auth.uid());

-- Group Discussions policies
create policy "Users can view discussions in groups they belong to." 
  on public.group_discussions for select 
  using (exists (
    select 1 from public.group_members 
    where group_members.group_id = group_id and group_members.user_id = auth.uid()
  ));

create policy "Users can post messages to groups they belong to." 
  on public.group_discussions for insert 
  with check (
    author_id = auth.uid() and 
    exists (
      select 1 from public.group_members 
      where group_members.group_id = group_id and group_members.user_id = auth.uid()
    )
  );

-- Voice Assistants policies
create policy "Voice assistants are publicly viewable." 
  on public.voice_assistants for select 
  using (true);

-- Notification Preferences policies
create policy "Users can view their notification preferences." 
  on public.notification_preferences for select 
  using (user_id = auth.uid());

create policy "Users can update their notification preferences." 
  on public.notification_preferences for update 
  using (user_id = auth.uid());

-- Security Settings policies
create policy "Users can view their security settings." 
  on public.security_settings for select 
  using (user_id = auth.uid());

create policy "Users can update their security settings." 
  on public.security_settings for update 
  using (user_id = auth.uid());

-- Connected Devices policies
create policy "Users can view their connected devices." 
  on public.connected_devices for select 
  using (user_id = auth.uid());

create policy "Users can delete their connected devices." 
  on public.connected_devices for delete 
  using (user_id = auth.uid());

-- Linked Accounts policies
create policy "Users can view their linked accounts." 
  on public.linked_accounts for select 
  using (user_id = auth.uid());

create policy "Users can create their linked accounts." 
  on public.linked_accounts for insert 
  with check (user_id = auth.uid());

create policy "Users can update their linked accounts." 
  on public.linked_accounts for update 
  using (user_id = auth.uid());

create policy "Users can delete their linked accounts." 
  on public.linked_accounts for delete 
  using (user_id = auth.uid());

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.contacts enable row level security;
alter table public.transactions enable row level security;
alter table public.savings_groups enable row level security;
alter table public.group_members enable row level security;
alter table public.group_discussions enable row level security;
alter table public.voice_assistants enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.security_settings enable row level security;
alter table public.connected_devices enable row level security;
alter table public.linked_accounts enable row level security;

-- Create demo data function
create or replace function create_demo_user()
returns uuid
language plpgsql
security definer
as $$
declare
  new_user_id uuid;
  contact_id uuid;
  savings_group_id uuid;
begin
  -- Create a demo user
  insert into auth.users (id, email, role)
  values (
    gen_random_uuid(),
    'demo-' || floor(random() * 1000000)::text || '@example.com',
    'authenticated'
  )
  returning id into new_user_id;
  
  -- Create user profile
  insert into public.users (
    id, first_name, last_name, email, phone, 
    language, theme, is_demo
  )
  values (
    new_user_id,
    'Demo',
    'User',
    'demo-' || floor(random() * 1000000)::text || '@example.com',
    '+256' || floor(random() * 900000000 + 100000000)::text,
    'en',
    'light',
    true
  );
  
  -- Create some contacts
  insert into public.contacts (user_id, name, phone, recent)
  values 
    (new_user_id, 'Sarah Nakato', '+256712345678', true),
    (new_user_id, 'David Okello', '+256774567890', true),
    (new_user_id, 'Mary Auma', '+256701234567', true),
    (new_user_id, 'John Mukasa', '+256782345678', false),
    (new_user_id, 'Grace Atim', '+256756789012', false)
  returning id into contact_id;
  
  -- Create some transactions
  insert into public.transactions (
    user_id, recipient_id, name, amount, type, 
    category, description
  )
  values 
    (new_user_id, contact_id, 'Sarah Nakato', 50000, 'sent', 'Family', 'Weekly allowance'),
    (new_user_id, null, 'MTN Mobile Money', 100000, 'received', 'Deposit', 'Salary deposit'),
    (new_user_id, null, 'Umeme Ltd', 75000, 'paid', 'Utilities', 'Electricity bill'),
    (new_user_id, contact_id, 'David Okello', 25000, 'sent', 'Friends', 'Lunch payment');
  
  -- Create a savings group
  insert into public.savings_groups (
    name, members_count, total_saved, goal_amount, 
    goal_name, progress, chairperson_id
  )
  values (
    'Kampala Market Vendors', 
    15, 
    1200000, 
    2000000, 
    'Business Expansion', 
    60, 
    new_user_id
  )
  returning id into savings_group_id;
  
  -- Add user as member of the group
  insert into public.group_members (
    user_id, group_id, role, contribution
  )
  values (
    new_user_id, 
    savings_group_id, 
    'Chairperson', 
    150000
  );
  
  -- Create notification preferences
  insert into public.notification_preferences (user_id)
  values (new_user_id);
  
  -- Create security settings
  insert into public.security_settings (user_id)
  values (new_user_id);
  
  return new_user_id;
end;
$$;

-- Create voice assistants
insert into public.voice_assistants (name, gender, language, preview)
values 
  ('Sarah', 'female', 'en-US', 'Hello, I''m Sarah. I''ll help you manage your finances.'),
  ('David', 'male', 'en-US', 'Hi there, I''m David. Let me assist with your money matters.'),
  ('Nakato', 'female', 'lg', 'Oli otya, nze Nakato. Nja kukuyamba n''ensimbi zo.'),
  ('Kato', 'male', 'lg', 'Oli otya ssebo/nnyabo, nze Kato. Ka nkuyambe ku by''ensimbi.'),
  ('Amina', 'female', 'sw-KE', 'Habari, mimi ni Amina. Nitakusaidia kusimamia fedha zako.'),
  ('Juma', 'male', 'sw-KE', 'Jambo, mimi ni Juma. Wacha nikusaidie na mambo ya fedha.');
