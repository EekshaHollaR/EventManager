Platform
Tool used: ChatGPT (Web)
Model: GPT-5


Prompt (my input to AI):

Based on the assumptions and features we defined earlier, design a normalized relational database schema. Include: - events - students - registrations (with unique constraint) - attendance check-in (with timestamp) - feedback (one per student per event) - event_managers Make sure: - Cancelled/postponed events remain in DB - Capacity is enforced - Cross-college registrations are possible - Support analytics queries later (popularity, top students, feedback sentiment). Please provide full CREATE TABLE SQL statements.

AI Response Generated : 

Design Notes

Students: all in one table, tied to their home college (but can register cross-college).

Events: include capacity, status (Scheduled/Cancelled/Postponed/etc.). Cancelled events remain in DB.

Registrations: enforces one student per event (UNIQUE (event_id, student_id)), and allows cross-college.

Attendance: linked to a registration (so only registered students can check in). Late check-ins possible via timestamp comparison.

Feedback: one per student per event → enforced with UNIQUE (event_id, student_id).

Event managers: separate mapping table (event_id ↔ manager_id) to allow multiple managers.

Analytics support: store timestamps, status, references → enables popularity queries, active students, sentiment aggregation.

-- Colleges
CREATE TABLE colleges (
    college_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL UNIQUE,
    created_at      TIMESTAMP DEFAULT now()
);

-- Students
CREATE TABLE students (
    student_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id      UUID REFERENCES colleges(college_id) ON DELETE SET NULL,
    name            TEXT NOT NULL,
    email           TEXT UNIQUE NOT NULL,
    created_at      TIMESTAMP DEFAULT now()
);

-- Events
CREATE TABLE events (
    event_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    college_id      UUID REFERENCES colleges(college_id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    description     TEXT,
    type            TEXT, -- e.g., Workshop, Seminar, Cultural
    start_time      TIMESTAMP NOT NULL,
    end_time        TIMESTAMP,
    location        TEXT,
    capacity        INT CHECK (capacity >= 0),
    seats_taken     INT DEFAULT 0 CHECK (seats_taken >= 0),
    status          TEXT NOT NULL DEFAULT 'SCHEDULED'
                    CHECK (status IN ('DRAFT','SCHEDULED','POSTPONED','CANCELLED','COMPLETED','FULL')),
    created_by      UUID REFERENCES students(student_id),
    created_at      TIMESTAMP DEFAULT now()
);

-- Registrations
CREATE TABLE registrations (
    registration_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id        UUID REFERENCES events(event_id) ON DELETE CASCADE,
    student_id      UUID REFERENCES students(student_id) ON DELETE CASCADE,
    registered_at   TIMESTAMP DEFAULT now(),
    status          TEXT DEFAULT 'REGISTERED'
                    CHECK (status IN ('REGISTERED','CANCELLED_BY_USER','CANCELLED_BY_ADMIN','CHECKED_IN','NO_SHOW')),
    ticket_id       UUID UNIQUE DEFAULT gen_random_uuid(),
    CONSTRAINT uniq_event_student UNIQUE (event_id, student_id) -- prevents duplicate registrations
);

-- Attendance (check-in)
CREATE TABLE attendance (
    attendance_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID UNIQUE REFERENCES registrations(registration_id) ON DELETE CASCADE,
    checkin_time    TIMESTAMP NOT NULL,
    checkin_method  TEXT DEFAULT 'QR' CHECK (checkin_method IN ('QR','MANUAL')),
    late_flag       BOOLEAN DEFAULT FALSE
);

-- Feedback
CREATE TABLE feedbacks (
    feedback_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id        UUID REFERENCES events(event_id) ON DELETE CASCADE,
    student_id      UUID REFERENCES students(student_id) ON DELETE CASCADE,
    registration_id UUID REFERENCES registrations(registration_id) ON DELETE CASCADE,
    rating          INT CHECK (rating BETWEEN 1 AND 5),
    comments        TEXT,
    sentiment       TEXT, -- optional: POSITIVE/NEUTRAL/NEGATIVE (from analysis pipeline)
    created_at      TIMESTAMP DEFAULT now(),
    CONSTRAINT uniq_feedback UNIQUE (event_id, student_id) -- one feedback per student per event
);

-- Event Managers
CREATE TABLE event_managers (
    event_id        UUID REFERENCES events(event_id) ON DELETE CASCADE,
    manager_id      UUID REFERENCES students(student_id) ON DELETE CASCADE,
    assigned_at     TIMESTAMP DEFAULT now(),
    PRIMARY KEY (event_id, manager_id) -- allow multiple managers per event but no duplicates
);

Action I took:

    I kept the 7-table schema that was proposed by AI

    Kept the status feild

    Used the UNIQUE constaints for registraction + feedbacks 

    I accepted the normalized swchema but add decisions like:


Extra decisions Made :
    AI suggested no restriction, but I  explicitly decided that students must be able to register across colleges.

    Cancelled/Postponed events remain in DB: Instead of deleting them, I decided to keep a status field like cancelled , postponed etc
    s. 
    I also added analytics use cases like top students, event popularity, sentiment trends that was not provided by the AI. 

