use faculty_tracking_app;
-- USER TYPES --
INSERT INTO user_types (type_name) VALUES ("Admin");
INSERT INTO user_types (type_name) VALUES ("Coordinator");
INSERT INTO user_types (type_name) VALUES ("Faculty");
INSERT INTO user_types (type_name) VALUES ("Applicant");

-- DEFAULT ADMIN --
	-- TEMP PASSWROD = 123ABC###jghe --
INSERT INTO admins(email, pswrd, type_id) VALUES ("admin@admin.com", "$2a$10$IWQpRV/IyqBfjtE8OXUtI.FepVBEh6Y7HPvgXYQdyMwIrfX4R8/ca", 1);

-- Application Status --
INSERT INTO application_status (s_name) VALUES ("In-Progress");
INSERT INTO application_status (s_name) VALUES ("Submitted");
INSERT INTO application_status (s_name) VALUES ("Under-Review");
INSERT INTO application_status (s_name) VALUES ("Interview-Booked");
INSERT INTO application_status (s_name) VALUES ("Hired");
INSERT INTO application_status (s_name) VALUES ("Rejected");

-- Terms --
INSERT INTO terms (term_name) VALUES ("Spring 2023");
INSERT INTO terms (term_name) VALUES ("Fall 2023");
INSERT INTO terms (term_name) VALUES ("Winter 2024");
INSERT INTO terms (term_name) VALUES ("Spring 2024");

-- Sections --
INSERT INTO sections (section_number) VALUES (1);
INSERT INTO sections (section_number) VALUES (2);
INSERT INTO sections (section_number) VALUES (3);
INSERT INTO sections (section_number) VALUES (4);
INSERT INTO sections (section_number) VALUES (5);
INSERT INTO sections (section_number) VALUES (6);
INSERT INTO sections (section_number) VALUES (7);
INSERT INTO sections (section_number) VALUES (8);
INSERT INTO sections (section_number) VALUES (9);
INSERT INTO sections (section_number) VALUES (10);
INSERT INTO sections (section_number) VALUES (11);
INSERT INTO sections (section_number) VALUES (12);
INSERT INTO sections (section_number) VALUES (13);
INSERT INTO sections (section_number) VALUES (14);
INSERT INTO sections (section_number) VALUES (15);
INSERT INTO sections (section_number) VALUES (16);
INSERT INTO sections (section_number) VALUES (17);
INSERT INTO sections (section_number) VALUES (18);
INSERT INTO sections (section_number) VALUES (19);
INSERT INTO sections (section_number) VALUES (20);
INSERT INTO sections (section_number) VALUES (21);
INSERT INTO sections (section_number) VALUES (22);
INSERT INTO sections (section_number) VALUES (23);
INSERT INTO sections (section_number) VALUES (24);
INSERT INTO sections (section_number) VALUES (25);

-- Skills --
INSERT INTO skills (skill_name) VALUES ('EMBEDDED SYSTEMS');
INSERT INTO skills (skill_name) VALUES ('OPERATING SYSTEMS');
INSERT INTO skills (skill_name) VALUES ('CYBER SECURITY');
INSERT INTO skills (skill_name) VALUES ('PROJECT MANAGEMENT');
INSERT INTO skills (skill_name) VALUES ('ADVANCED MATH');
INSERT INTO skills (skill_name) VALUES ('PROGRAMMING');
INSERT INTO skills (skill_name) VALUES ('DATA SCIENCE');
INSERT INTO skills (skill_name) VALUES ('SOFTWARE ENGINEERING');
INSERT INTO skills (skill_name) VALUES ('IT SERVICE MANAGEMENT');
INSERT INTO skills (skill_name) VALUES ('COMPUTER HARDWARE');
INSERT INTO skills (skill_name) VALUES ('DATABASE ADMIN & SQL');
INSERT INTO skills (skill_name) VALUES ('CAPSTONE PROJECT MENTOR');
INSERT INTO skills (skill_name) VALUES ('JAVA');
INSERT INTO skills (skill_name) VALUES ('C++');
INSERT INTO skills (skill_name) VALUES ('C');
INSERT INTO skills (skill_name) VALUES ('C#');
INSERT INTO skills (skill_name) VALUES ('R');
INSERT INTO skills (skill_name) VALUES ('AZURE');
INSERT INTO skills (skill_name) VALUES ('WEB TECHNOLOGIES');
INSERT INTO skills (skill_name) VALUES ('iOS DEVELOPMENT ');
INSERT INTO skills (skill_name) VALUES ('ANDROID DEVELOPMENT');
INSERT INTO skills (skill_name) VALUES ('ARTIFICIAL INTELLIGENCE');
INSERT INTO skills (skill_name) VALUES ('MACHINE LEARNING');
INSERT INTO skills (skill_name) VALUES ('UX/UI');

-- Skill Rankings --
INSERT INTO skill_rankings (ranking) VALUES ('N/A');
INSERT INTO skill_rankings (ranking) VALUES ('NOVICE');
INSERT INTO skill_rankings (ranking) VALUES ('SKILLED');
INSERT INTO skill_rankings (ranking) VALUES ('EXPERT');

-- Day of the Week --
INSERT INTO days_of_week (day_of_week) VALUES ("MONDAY");
INSERT INTO days_of_week (day_of_week) VALUES ("TUESDAY");
INSERT INTO days_of_week (day_of_week) VALUES ("WEDNESDAY");
INSERT INTO days_of_week (day_of_week) VALUES ("THURSDAY");
INSERT INTO days_of_week (day_of_week) VALUES ("FRIDAY");
INSERT INTO days_of_week (day_of_week) VALUES ("SATURDAY");
INSERT INTO days_of_week (day_of_week) VALUES ("SUNDAY");