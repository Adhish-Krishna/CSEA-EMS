-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    rollno VARCHAR(50),
    password TEXT,
    department TEXT,
    email VARCHAR(100),
    phoneno BIGINT,
    yearofstudy INTEGER,
    created_at TIMESTAMP
);

-- Table: clubs
CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    name TEXT,
    about TEXT
);

-- Table: events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT,
    about TEXT,
    date DATE,
    event_type TEXT,
    event_category TEXT,
    min_no_member INTEGER,
    max_no_member INTEGER
);

-- Table: teams
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- Table: facultyAdvisors
CREATE TABLE facultyAdvisors (
    id SERIAL PRIMARY KEY,
    name TEXT,
    department TEXT,
    designation TEXT
);

--Table: userSecurityCode
CREATE TABLE userSecurityCode (
    id SERIAL PRIMARY KEY,
    user_id INTEGER not NULL,
    code TEXT,
    created_at TIMESTAMP,
    CONSTRAINT fk_userSecurityCode_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table: clubMembers
CREATE TABLE clubMembers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    club_id INTEGER NOT NULL,
    role TEXT,
    is_admin BOOLEAN,
    CONSTRAINT fk_clubMembers_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_clubMembers_club FOREIGN KEY (club_id) REFERENCES clubs(id)
);

-- Table: eventConvenors
CREATE TABLE eventConvenors (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    club_id INTEGER NOT NULL,
    CONSTRAINT fk_eventConvenors_event FOREIGN KEY (event_id) REFERENCES events(id),
    CONSTRAINT fk_eventConvenors_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_eventConvenors_club FOREIGN KEY (club_id) REFERENCES clubs(id)
);

-- Table: eventRegistration
CREATE TABLE eventRegistration (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    CONSTRAINT fk_eventRegistration_event FOREIGN KEY (event_id) REFERENCES events(id),
    CONSTRAINT fk_eventRegistration_team FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Table: teamMembers
CREATE TABLE teamMembers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    CONSTRAINT fk_teamMembers_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_teamMembers_team FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Table: organizingClubs
CREATE TABLE organizingClubs (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL,
    club_id INTEGER NOT NULL,
    CONSTRAINT fk_organizingClubs_event FOREIGN KEY (event_id) REFERENCES events(id),
    CONSTRAINT fk_organizingClubs_club FOREIGN KEY (club_id) REFERENCES clubs(id)
);

-- Table: feedback
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    feedback TEXT,
    rating INTEGER,
    created_at TIMESTAMP,
    CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_feedback_event FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Table: eventWinners
CREATE TABLE eventWinners (
    id SERIAL PRIMARY KEY,
    team_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    position INTEGER,
    CONSTRAINT fk_eventWinners_team FOREIGN KEY (team_id) REFERENCES teams(id),
    CONSTRAINT fk_eventWinners_event FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Table: eventAttendance
CREATE TABLE eventAttendance (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    is_present BOOLEAN,
    CONSTRAINT fk_eventAttendance_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_eventAttendance_event FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Table: clubAdvisors
CREATE TABLE clubAdvisors (
    id SERIAL PRIMARY KEY,
    facultyAdvisor_id INTEGER NOT NULL,
    club_id INTEGER NOT NULL,
    CONSTRAINT fk_clubAdvisors_facultyAdvisor FOREIGN KEY (facultyAdvisor_id) REFERENCES facultyAdvisors(id),
    CONSTRAINT fk_clubAdvisors_club FOREIGN KEY (club_id) REFERENCES clubs(id)
);

-- Table: invitation
CREATE TABLE invitation (
    id SERIAL PRIMARY KEY,
    from_team_id INTEGER NOT NULL,
    to_team_id INTEGER NOT NULL,
    CONSTRAINT fk_invitation_from_team FOREIGN KEY (from_team_id) REFERENCES teams(id),
    CONSTRAINT fk_invitation_to_team FOREIGN KEY (to_team_id) REFERENCES teams(id)
);
