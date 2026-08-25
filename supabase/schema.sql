-- Contact Messages
CREATE TABLE public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Volunteer Applications
CREATE TABLE public.volunteer_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    area_of_interest TEXT NOT NULL,
    availability TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Partner Proposals
CREATE TABLE public.partner_proposals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    proposal TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
