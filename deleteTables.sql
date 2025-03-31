-- Start a transaction for safety
BEGIN;

-- First truncate tables with foreign key dependencies
TRUNCATE TABLE invitation, clubAdvisors, eventAttendance, eventWinners,
             feedback, organizingClubs, teamMembers, eventRegistration,
             eventConvenors, clubMembers CASCADE;

-- Then truncate base tables
TRUNCATE TABLE facultyAdvisors, teams, events, clubs, users CASCADE;

COMMIT;