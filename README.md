# Majestic Moments

https://fkhadra.github.io/react-toastify/installation/

npm i bcrypt

import bcrypt from "bcrypt"

const hash = bcrypt.hashSync(myPlaintextPassword, salt);


---
For compaire
bcrypt.compareSync(myPlaintextPassword, hash);


note 2

1. create a file for only client components

reacttoastify.js

"use client"

export { ToastContainer } from "react-toastify";

2. in layout.js

import { ToastContainer } from "./reacttoastify.js";
import 'react-toastify/dist/ReactToastify.css';

Added inside the body

<ToastContainer />

3. Signup page

```js
import { toast, Bounce } from "react-toastify";

if (res.ok) {
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      
      setName("");
      setEmail("");
      setPhotoURL("");
      setPassword("");
    } else {
      const errorData = await res.json();
      toast.error(
        `Signup failed: ${errorData.message || "Please try again."}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
    }

```


## Google signin

https://developers.google.com/identity/protocols/oauth2

click on Google API Console or click on here directly

https://console.developers.google.com/apis/credentials

> Create a new project from upper part 

+ CREATE CREDENTIALS > OAuth client ID

CONFIGURE CONSENT SCREEN

  User Type: External > CREATE


After fillup required fields, click on SAVE AND CONTINUE ...  

Credentials > 

- Authorized JavaScript origins -> http://localhost:3000

- Authorized redirect URIs -> http://localhost:3000/api/auth/callback/google

In a popup you will get id and secret


For more: 

Configuration
https://console.developers.google.com/apis/credentials

The "Authorized redirect URIs" used when creating the credentials must include your full domain and end in the callback path. For example;

For production: https://{YOUR_DOMAIN}/api/auth/callback/google
For development: http://localhost:3000/api/auth/callback/google


## Github signin

Configuration
https://github.com/settings/apps

> OAuth Apps

Application name
Homepage URL
Authorization callback URL: http://localhost:3000/api/auth/callback/github

click on Register Application
