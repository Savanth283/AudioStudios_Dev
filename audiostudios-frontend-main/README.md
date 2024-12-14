Step 1 :  `git clone http://git.idiosys.co.uk/audiostudios/audiostudios-frontend.git`
Step 2 : `npm install`  // user node  18 
Step 3: `npm run dev -- -p 3001`


Note : Run the backend code first for running api
Generally api will be run on 3000 port 
if you run this in different port then change the api path variable (NEXT_PUBLIC_API_URL) on .env.local file
Fortend (Next application) will be unning on 3001 port.
If you change the port then change the NEXTAUTH_URL variable on .env.local file
