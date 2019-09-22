<body>
<h1 style="text-align: center;">&lt;Job Portal&gt;<br>
</h1>
<h1 style="text-align: center;">Meeting Minutes &lt;Sep 18, 2019&gt;<br>
</h1>
<h2 style="text-align: center;">CSCI-P465/565 (Software Engineering I)</h2>
<h2 style="text-align: center;"><span
 style="text-decoration: underline;">Meeting Attendees<br>
</span></h2>
<h3 style="text-align: center;">&lt;Ravichandran,Sharanya&gt;</h3>
<h3 style="text-align: center;">&lt;Paul,Hrishikesh&gt;</h3>
<h3 style="text-align: center;">&lt;Norton,Cole&gt;</h3>
<h3 style="text-align: center;">&lt;Zhang,Rui&gt;</h3>
<br>
<hr style="width: 100%; height: 2px;"><br>
<h2>General Meeting Info</h2>
<div style="margin-left: 40px;"><span style="font-weight: bold;">Meeting
Purpose: </span>Brainstorming on project<br>
</div>
<span style="font-weight: bold;"><br>
</span>
<div style="margin-left: 40px;"><span style="font-weight: bold;">Start
Time:</span> 10:00 a.m. Sep 18, 2019<br>
</div>
<span style="font-weight: bold;"><br>
</span>
<div style="margin-left: 40px;"><span style="font-weight: bold;">Stop
Time: </span>12:45 a.m. Sep 18, 2019<br>
</div>

<!-- <h2>Old Business</h2>
<div style="margin-left: 40px;"><span style="font-weight: bold;">Action
Item Status: </span>Provide status on all outstanding action items (if applicable)<br>
<br>
</div> -->

<h2>New Business</h2>
<br>
<div style="margin-left: 40px;"><span style="font-weight: bold;">Discussions
Summary:
</span> 
<!-- Document any discussions that took place during the
meeting.&nbsp; Note specifics of the conversation, particularly for
customer meetings.&nbsp; In this section it needs to be evident what
topics were discussed in a fair amount of detail.<br> -->
</div>

### Views:
- job seeker
- employer or organization
- recruiter
- Linked Admin
  - manually delete posts/ profiles/ organizations if fake
  - announcement

### features:
1. login and registration
   - roles like employers/recruiters and job seekers
   - captcha
   - unique user identification" allow to use usernames which are not taken already
   - verification: email or phone
   - generate notifications
   - multi-factor authentication and OAuth integration
     - OAuth
     - Two factor authentication
2. view/home
   - show applicable positions
   - profile with picture
   - 
3. search and filter
4. job posts and apply
    - cardinality of user to applications to a company
    - see list of candidates
    - email a summary of detailed requirement
5. chat
   - with people connected
   - group (people applied the same company)
   - asynchronous features
   - people in my network , view profiles
6. optional: recommendation
7. notification
   - post of company they applied
   - candidates update their status such as looking for jobs
8. skill assessment test and certification
9. peer endorsement

5 required features + 1 optional

---

<div style="margin-left: 40px;"><span style="font-weight: bold;">Our Key Ideas
</span> </div>

- candidate filtering
  - Applicant 
    - Skill input 
      - LinkedIn API
      - Build Online Profile 
      - analyze PDF resume
  - Position 
    - skill requirement
  1. limit applicants' access to positions
  2. Recruiter review applicants' profile 
---
<br>
<div style="margin-left: 40px;"><span style="font-weight: bold;">Decisions
Summary:</span> <br>
<div style="margin-left: 40px;"><span style="font-weight: bold;">UI
</span> </div>

- Employee
  1. Login
    - login with LinkedIn
  2. Main Page
    1. Job List
        - **search** bar
        - jobs in categories (role) cards stack
          - hide positions that skill set doesn't match
          - each card:
            - content:
              - Company
              - Title
              - Location
          - click on card
            - detailed requirements
            - Apply/Pass button
  3. Profile Page

- Employer
    1. Sign up
    2. Main Page
       - Applicants' profile by roles, positions...
       - Accept an application to give applicant
    4. Post job
        - choose category of role
        - fill out skill requirement
          - Language:
            - category e.g. OOP
            - specific language

---
<div style="margin-left: 40px;"><span style="font-weight: bold;">Tech
</span> </div>

- MongoDB
- EXPRESS
- Heroku
- Vue
- Node.js
<br>
---
<span style="font-weight: bold;">New Action Items:</span> <br>

**Elevator Pitch**: Cole Norton<br>
**Project Plan**: Sharanya Ravichandran, Cole Norton<br>
**Demo**: Hrishikesh Paul<br>
**Weekly Report & Meeting Minutes**: Rui Change





