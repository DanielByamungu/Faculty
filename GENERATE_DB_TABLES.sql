-- DROP DATABASE IF EXISTS faculty_tracking_app;
CREATE DATABASE IF NOT EXISTS faculty_tracking_app;
USE faculty_tracking_app;

CREATE TABLE IF NOT EXISTS `user_types` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_name_UNIQUE` (`type_name`)
);

CREATE TABLE IF NOT EXISTS `skills` (
  `skill_id` int NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(255) NOT NULL,
  PRIMARY KEY (`skill_id`)
);

CREATE TABLE IF NOT EXISTS `skill_rankings` (
  `ranking_id` int NOT NULL AUTO_INCREMENT,
  `ranking` varchar(10) NOT NULL,
  PRIMARY KEY (`ranking_id`)
);

CREATE TABLE IF NOT EXISTS `sections` (
  `section_id` int NOT NULL AUTO_INCREMENT,
  `section_number` int NOT NULL,
  PRIMARY KEY (`section_id`)
);

CREATE TABLE IF NOT EXISTS `terms` (
  `term_id` int NOT NULL AUTO_INCREMENT,
  `term_name` varchar(255) NOT NULL,
  PRIMARY KEY (`term_id`)
);

CREATE TABLE IF NOT EXISTS `application_status` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `s_name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`s_id`)
);

CREATE TABLE IF NOT EXISTS `days_of_week` (
  `day_id` int NOT NULL AUTO_INCREMENT,
  `day_of_week` varchar(255) NOT NULL,
  PRIMARY KEY (`day_id`)
);

CREATE TABLE IF NOT EXISTS `programs` (
  `pr_id` int NOT NULL AUTO_INCREMENT,
  `pr_name` varchar(255) NOT NULL,
  PRIMARY KEY (`pr_id`)
);

CREATE TABLE IF NOT EXISTS `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_code` varchar(255) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `section_id` int NOT NULL,
  `term_id` int NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `FK_SECTIONS_COURSES` (`section_id`),
  KEY `FK_TERMS_COURSES` (`term_id`),
  CONSTRAINT `FK_SECTIONS_COURSES` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`),
  CONSTRAINT `FK_TERMS_COURSES` FOREIGN KEY (`term_id`) REFERENCES `terms` (`term_id`)
);

CREATE TABLE IF NOT EXISTS `job_postings` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  PRIMARY KEY (`job_id`),
  KEY `FK_COURSES_JOBPOSTINGS` (`course_id`),
  CONSTRAINT `FK_COURSES_JOBPOSTINGS` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
);

CREATE TABLE IF NOT EXISTS `admins` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `pswrd` varchar(255) NOT NULL,
  `type_id` int NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email` (`email`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `FK_ADMINS_USERTYPES` FOREIGN KEY (`type_id`) REFERENCES `user_types` (`type_id`)
);

CREATE TABLE IF NOT EXISTS `coordinators` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `pswrd` varchar(255) NOT NULL,
  `type_id` int NOT NULL,
  `pr_id` int NOT NULL,
  `hire_date` date NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_USERTYPE_COORDINATOR` (`type_id`),
  KEY `FK_PROGRAM_COORDINATOR` (`pr_id`),
  CONSTRAINT `FK_PROGRAM_COORDINATOR` FOREIGN KEY (`pr_id`) REFERENCES `programs` (`pr_id`),
  CONSTRAINT `FK_USERTYPE_COORDINATOR` FOREIGN KEY (`type_id`) REFERENCES `user_types` (`type_id`)
);

CREATE TABLE IF NOT EXISTS `faculty` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `pswrd` varchar(255) NOT NULL,
  `type_id` int NOT NULL,
  `hire_date` date NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `rating_avg` decimal(10,0) DEFAULT '0',
  `home_phone` varchar(45) DEFAULT NULL,
  `mobile_phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_USERTYPE_FACULTY` (`type_id`),
  CONSTRAINT `FK_USERTYPE_FACULTY` FOREIGN KEY (`type_id`) REFERENCES `user_types` (`type_id`)
);

CREATE TABLE IF NOT EXISTS `applicants` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `pswrd` varchar(255) NOT NULL,
  `type_id` int NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `home_phone` varchar(45) DEFAULT NULL,
  `mobile_phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_USERTYPE_APPLICANT` (`type_id`),
  CONSTRAINT `FK_USERTYPE_APPLICANT` FOREIGN KEY (`type_id`) REFERENCES `user_types` (`type_id`)
);

CREATE TABLE IF NOT EXISTS `applications` (
  `app_id` int NOT NULL AUTO_INCREMENT,
  `s_id` int NOT NULL,
  `job_id` int NOT NULL,
  `date_created` datetime NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `available_term` tinyint DEFAULT NULL,
  `vacation_planned` tinyint DEFAULT NULL,
  `available_in_person_waterloo` tinyint DEFAULT NULL,
  `available_in_person_guelph` tinyint DEFAULT NULL,
  `hrs_week` varchar(75) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `u_id` int NOT NULL,
  `residing_ontario` bit(1) NOT NULL,
  PRIMARY KEY (`app_id`),
  KEY `FK_APPLICANT_APPLICATION` (`u_id`),
  KEY `FK_JOBPOSTINGS_APPLICATIONS` (`job_id`),
  KEY `FK_STATUS_APPLICATIONS` (`s_id`),
  CONSTRAINT `FK_APPLICANT_APPLICATION` FOREIGN KEY (`u_id`) REFERENCES `applicants` (`u_id`),
  CONSTRAINT `FK_FACULTY_APPLICATION` FOREIGN KEY (`u_id`) REFERENCES `faculty` (`u_id`),
  CONSTRAINT `FK_JOBPOSTINGS_APPLICATIONS` FOREIGN KEY (`job_id`) REFERENCES `job_postings` (`job_id`),
  CONSTRAINT `FK_STATUS_APPLICATIONS` FOREIGN KEY (`s_id`) REFERENCES `application_status` (`s_id`)
);

CREATE TABLE IF NOT EXISTS `faculty_skills` (
  `skill_id` int NOT NULL,
  `u_id` int NOT NULL,
  `ranking_id` int DEFAULT NULL,
  PRIMARY KEY (`skill_id`,`u_id`),
  KEY `FK_APPLICANT_FACULTYSKILLS` (`u_id`),
  KEY `FK_SKILLRANKING_FACULTYSKILLS_idx` (`ranking_id`),
  CONSTRAINT `FK_APPLICANT_FACULTYSKILLS` FOREIGN KEY (`u_id`) REFERENCES `faculty` (`u_id`),
  CONSTRAINT `FK_SKILLRANKING_FACULTYSKILLS` FOREIGN KEY (`ranking_id`) REFERENCES `skill_rankings` (`ranking_id`),
  CONSTRAINT `FK_SKILLS_FACULTYSKILLS` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`)
);

CREATE TABLE IF NOT EXISTS `courses_taught` (
  `course_id` int NOT NULL,
  `u_id` int NOT NULL,
  PRIMARY KEY (`course_id`,`u_id`),
  KEY `FK_APPLICANT_COURSESTAUGHT` (`u_id`),
  CONSTRAINT `FK_APPLICANT_COURSESTAUGHT` FOREIGN KEY (`u_id`) REFERENCES `faculty` (`u_id`),
  CONSTRAINT `FK_SKILLS_COURSESTAUGHT` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
);

CREATE TABLE IF NOT EXISTS `course_schedule` (
  `cs_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `day_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`cs_id`),
  KEY `FK_COURSE_COURSESCHEDULE` (`course_id`),
  KEY `FK_DAYOFWEEK_COURSESCHEDULE` (`day_id`),
  CONSTRAINT `FK_COURSE_COURSESCHEDULE` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `FK_DAYOFWEEK_COURSESCHEDULE` FOREIGN KEY (`day_id`) REFERENCES `days_of_week` (`day_id`)
);

CREATE TABLE IF NOT EXISTS `faculty_availability` (
  `av_id` int NOT NULL AUTO_INCREMENT,
  `u_id` int NOT NULL,
  `day_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`av_id`),
  KEY `FK_FACULTY_FACULTYAVAILABILITY` (`u_id`),
  KEY `FK_DAYOFWEEK_FACULTYAVAILABILITY` (`day_id`),
  CONSTRAINT `FK_DAYOFWEEK_FACULTYAVAILABILITY` FOREIGN KEY (`day_id`) REFERENCES `days_of_week` (`day_id`),
  CONSTRAINT `FK_FACULTY_FACULTYAVAILABILITY` FOREIGN KEY (`u_id`) REFERENCES `faculty` (`u_id`)
);

CREATE TABLE IF NOT EXISTS `applicant_availability` (
  `av_id` int NOT NULL AUTO_INCREMENT,
  `u_id` int NOT NULL,
  `day_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`av_id`),
  KEY `FK_APPLICANT_APPLICANTAVAILABILITY` (`u_id`),
  KEY `FK_DAYOFWEEK_APPLICANTAVAILABILITY` (`day_id`),
  CONSTRAINT `FK_APPLICANT_APPLICANTAVAILABILITY` FOREIGN KEY (`u_id`) REFERENCES `applicants` (`u_id`),
  CONSTRAINT `FK_DAYOFWEEK_APPLICANTAVAILABILITY` FOREIGN KEY (`day_id`) REFERENCES `days_of_week` (`day_id`)
);

CREATE TABLE IF NOT EXISTS `faculty_ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `u_id` int NOT NULL,
  `rating_value` int NOT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `FK_FACULTY_FACULTYRATINGS` (`u_id`),
  CONSTRAINT `FK_FACULTY_FACULTYRATINGS` FOREIGN KEY (`u_id`) REFERENCES `faculty` (`u_id`)
);

CREATE TABLE `excel_db_sheets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date_added` date DEFAULT NULL,
  `file_data` tinyblob,
  `u_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
);
