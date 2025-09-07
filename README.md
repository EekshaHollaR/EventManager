
The Campus Event Management is a platform designed for creating different events of college, let students register into events. We can also track attendence and feedback of the events accross multiple campuses,

The platform mainly consists of 2 main interfaces:
    1. Admin Portal --> for college staffs
    2. Student App --> for students to interact


Assumptions:

For the purpose of designing the platform :
    I am assuming the following things:
    
    Planning the platform for medium scale: 
        1. Target Scale: 50 colleges
        2. Students per college: 500
        3. Number of events per semester: 20 event per college 

    So totally there can be : 1000 events per semester with total 25000 students participating 

    1. Unique ID should be used so that event IDs are unique across colleges. And easier for inter college events.
    
    2. Would maintain a single database with college if on tables for easier quering and reporting. And also the given scaling is small to medium scaling and hence single database is fine


    So we can use relational DB like SQLite or Postgres 

    Target audience :
        1. Students
        2. College Staffs 
        3. Event Managers

    Peak loads to be managed : system should be handled during peak fest times

    Events can be postponed or cancelled

    Events can have limits for registration 

    Walk in registration can be done for particular events  

    Popularity = number of registration ( not attendence )
    Participation = number of events attended by student 


Decisions Made for the Above assumptions:
1. Using Only one DB instead of seperate DB per college
2. Enabling Cross College Registeration
3. Feedback system allowed for only students who attended the event and only one feedback per student 
4. If event is postpone or cancelled still the data of the event must remain
5. Duplicate registration should be looked into (adding unique constraint )
6. Registration should be stopped after the limit is reached 
7. Filters by events type, date and college to get better insight 
8. Alotting the events to different event manager 

Edge Cases:
1. Duplicate registration
2. Cancelled events
3. Missing Feedback
4. Late attendence - check in 

Key Features:
1. Event Creation and Management
2. Student Registration
3. Student attendence and Check-in 
4. Feedback System 
5. Report generation and Analysis of events
6. QR Code based Check-in
7. Auto Event Remainder System
8. Event Recommendation System
9. Dashboard with event popularity, attendence, feedback etc analysis 
10. Upcoming events list 
11. Active Students listing  --> Getting top students 
12. Sentiment analysis of feedback
13. Assignment of Events to event manager


LLM used for Brainstroming:
ChatGPT 

AI Conversation log: 



## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
