# Campus Event Management & Reporting System

## Platform Tool Used
- **ChatGPT**  
- **Model:** GPT-5  

---

## Prompt (my input to AI)

I want to build a Campus Event Management & Reporting System.  
Here are the requirements and assumptions:

- Single database across colleges  
- Cross-college registration allowed  
- Feedback only for attendees, one per student  
- Cancelled/postponed events must still be stored  
- Duplicate registration must be prevented (unique constraint)  
- Stop registration once limit is reached  
- Filters by type, date, college  
- Assign event managers  
- **Edge cases:** duplicate registration, cancelled events, missing feedback, late check-in.  

**Key features:**  
Event creation/management, registration, attendance with QR check-in, feedback system, reports, reminders, recommendations, dashboards, active students, sentiment analysis, event manager assignment.

**Request:**  
Please give me a high-level system architecture and design choices (DB approach, API outline, analytics ideas).

---

## AI Response (summary)

### Architecture (components)

**Frontend apps:**
- Admin portal (React)  
- Student app (React Native / Web)  
- QR scanner app for check-in  

**Backend services (modular but could be monolith in MVP):**
- Auth & RBAC (JWT, roles: admin, manager, student)  
- Event Management service  
- Registration service  
- Attendance service (QR-based)  
- Feedback service  
- Reports & analytics service  
- Notification/reminder service  
- Recommendation service  

**Databases & caches:**
- PostgreSQL (primary DB) with `college_id` foreign keys  
- Redis (caching + atomic seat counters)  
- OLAP store (ClickHouse/BigQuery) for analytics  
- Search index (Elasticsearch) for event search  

**Infra/ops:**  
Monitoring with Prometheus + Grafana, tracing with Jaeger, logs with ELK, rate limiting, TLS security  

---

### Data model (key points)

- **events** with `status` field (`SCHEDULED`, `CANCELLED`, `POSTPONED`, `COMPLETED`)  
- **registrations** with `UNIQUE(event_id, user_id)` to prevent duplicates  
- **attendance** linked to registrations (only registered students can check in)  
- **feedbacks** tied to `registration_id` to ensure only attendees submit once  
- **event_managers** linking users to events  
- Indices on event date, type, college for filters  

---

### Design choices & edge cases

- **Duplicate registration** → enforced by DB unique constraint  
- **Capacity enforcement** → suggested atomic Redis counter or Postgres `UPDATE … RETURNING` pattern  
- **Cancelled/postponed events** → use status field instead of deleting  
- **Feedback** → only allowed for checked-in attendees, enforce uniqueness by `(event_id, user_id)`  
- **Late check-in** → flag attendance as `late_flag`  

---

### API outline (paths only)

- `/events` (create, update, filter by type/date/college)  
- `/registrations` (register, cancel, enforce unique + capacity)  
- `/attendance/checkin` (QR scan → mark attendance, late check flag)  
- `/feedback` (submit feedback if checked-in)  
- `/reports` (popularity, attendance %, feedback avg, top students)  
- `/recommendations` (rule-based suggestions)  
- `/notifications` (event reminders, cancellation alerts)  

---

### Analytics ideas

- Reports on registrations, attendance %, feedback averages  
- Sentiment analysis for feedback (basic transformer / rule-based)  
- Recommendation engine (rule-based now, collaborative filtering later)  
- Dashboards: college-level overview, top students, event popularity  

---

## What I Accepted

- Using a single shared database with `college_id` in relevant tables  
- Keeping event status field instead of soft-deletes  
- Enforcing duplicate registration prevention with DB unique constraint  
- Using Redis or Postgres atomic updates to manage event capacity  
- Implementing basic sentiment analysis on feedback (positive/neutral/negative)  
- Adding recommendations (rule-based for MVP, ML later)  

---

## What I Rejected / Modified

- AI suggested separate microservices for each module → I decided to keep a **monolithic FastAPI app** with modular routers for simplicity in the prototype  
- AI recommended full OLAP store (ClickHouse/BigQuery) → I will instead use **materialized views in Postgres** for analytics in the prototype  
- AI proposed complex offline QR sync logic → I will only implement **simple online QR scanning** in MVP  

---

## Note

Screenshot and the conversation is saved in **AI-conversational-log.md**
