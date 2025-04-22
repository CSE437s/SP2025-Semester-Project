# SP2025: Group 11, 3D terrain maps for Ski Resorts

Name your repository using the following format:  
**SP2025_Group_&lt;Group Number&gt;**  
(Example: SP2025_Group_9)

## Team Members
- **Evan Chee**: chee@wustl.edu ; chee284
- **Daniel Du**: d.du@wustl.edu ; DanielDu0377
- **Nate Reyes**: n.e.reyes@wustl.edu; nathanreyes32

## TA
&lt;Name of your group's TA&gt;

## Objectives
&lt;Description of what your project is about, your key functionalities, tech stacks used, etc. &gt;

Stack: 
* React
* TypeScript
* Python
* Supabase (local)
* Docker

## How to Run
&lt;Instructions for how to run your project. Include the URI to your project at the top if applicable.&gt;

Frontend:
```bash
cd ski_slopes
npm run dev
```

Auth:
* Ensure docker running
```bash
supabase start
```

Backend:
```bash
cd backend
pdm install
fastapi dev src/server.py
```
