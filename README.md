#  Campus Event Management Platform  

The **Campus Event Management** is a platform designed for creating different events of college, letting students register into events. We can also track attendance and feedback of the events across multiple campuses.  

---

## Platform Interfaces  
The platform mainly consists of **2 main interfaces**:  
1. **Admin Portal** → for college staffs  
2. **Student App** → for students to interact  

---

## Assumptions  

For the purpose of designing the platform, I am assuming the following things:  

### Planning the platform for medium scale:  
- **Target Scale**: 50 colleges  
- **Students per college**: 500  
- **Number of events per semester**: 20 events per college  

So totally there can be: **1000 events per semester** with **25,000 students participating**.  

### Other assumptions:  
1. Unique ID should be used so that event IDs are unique across colleges, making inter-college events easier.  
2. A single database will be maintained with college info on tables for easier querying and reporting. The scaling is small-to-medium, so a single DB is fine.  
3. Use a relational DB like **SQLite** or **Postgres**.  

### Target Audience:  
- Students  
- College Staffs  
- Event Managers  

### Peak loads:  
The system should handle **peak fest times**.  

### Event-related rules:  
- Events can be postponed or cancelled.  
- Events can have limits for registration.  
- Walk-in registration can be allowed for particular events.  
- **Popularity** = number of registrations (not attendance).  
- **Participation** = number of events attended by a student.  

---

## Decisions Made (based on assumptions)  
1. Using only **one DB** instead of separate DB per college.  
2. Enabling **cross-college registration**.  
3. Feedback system allowed only for students who attended the event (**1 feedback per student**).  
4. If an event is postponed or cancelled, its data must remain.  
5. Duplicate registration prevention with **unique constraint**.  
6. Registration should stop once the limit is reached.  
7. Add filters by **event type, date, and college** for better insights.  
8. Assign events to different **event managers**.  

---

## Edge Cases  
1. Duplicate registration  
2. Cancelled events  
3. Missing feedback  
4. Late attendance / check-in  

---

## Key Features  
1. Event creation and management  
2. Student registration  
3. Student attendance & check-in  
4. Feedback system  
5. Report generation & analysis of events  
6. **QR Code based check-in**  
7. Auto event reminder system  
8. Event recommendation system  
9. Dashboard with event popularity, attendance, and feedback analysis  
10. Upcoming events list  
11. Active students listing → finding **top students**  
12. **Sentiment analysis** of feedback  
13. Assignment of events to event manager  

---

## 🤖 LLM Used for Brainstorming  
- **ChatGPT**  

---

## 🛠️ Tech Stack  

This project is built with:  
- ⚡ **Vite**  
- 🟦 **TypeScript**  
- ⚛️ **React**  
- 🎨 **shadcn-ui**  
- 🎀 **Tailwind CSS**  
- **SQLit**

---

## How to RUN Locally

# Project Setup Instructions

Steps to set up the project Locally -->
---

## 1. Prerequisites

Have the following Installed :

- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- [npm](https://www.npmjs.com/) (comes with Node.js)  
- Optional: [Git](https://git-scm.com/) for cloning the repository

---

## 2. Clone the Repository

```bash
git clone <https://github.com/EekshaHollaR/EventManager.git>
cd <unify-campus-event>
```


The project is present in the folder unified-campus-event so navigate to the folder then follow : 

## 3. Download the dependencies 

```bash
npm install ## or use
npm i
```

## 4. start the Development Server

```bash
npm run dev
```

## Troubleshoot

If npm install fails, try clearing npm cache:
```bash
npm cache clean --force
```
If port already in use then change the confirguration in the env
Check the Node.js and npm versions 

```bash 
node -v
npm -v
```

## Note
1. Make sure you have stable internet connection while downloading the dependencies 
2. Make sure you pull the latest changes before starting the development

    ```bash
    git pull origin main
    ```
 


