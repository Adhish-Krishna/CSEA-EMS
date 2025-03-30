-- This sql is seperate from the sql files in the sql folder because this is only executed in developement
-- Truncate command to delete all tables
TRUNCATE TABLE
    clubAdvisors, exemption, eventAttendance, eventWinners, feedback, organizingClubs,
    teamMembers, eventRegistration, eventConvenors, clubAdmins, clubMembers,
    events, teams, facultyAdvisors, clubs, users
RESTART IDENTITY CASCADE;