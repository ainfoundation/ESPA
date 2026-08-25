-- Election Votes Table
CREATE TABLE public.election_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    voter_name TEXT NOT NULL,
    title TEXT NOT NULL,
    nominee_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
