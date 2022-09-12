- bycrypt login
- jwt token, refresh token usage throught session


- BACKEND:
- check if user allready has refresh token before logging in or regiser:
  - if user has RT and tried to login or register, delete all tokens and redirect to login page

- research if it is possible to clear all cookies (including httpOnly cookies in react).
- if it is possible, then in useLoginStatusLight hook add a statement:
if (document.cookies.isLoggedIn !== true) clear all cookies, including httpOnly cookies.
- if it is not possible, then make a new route "/api/cleartokens" which will delete all cookies by sending a request from server.

 FRONTEND

 -- create seperate interfaces for each page, if user data from database is used