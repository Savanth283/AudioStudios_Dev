import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password,otp } = credentials;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer-login`, {
          method: 'POST',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password,otp })
        });

        const data = await res.json();

        if (res.ok) {
          return data;
        } else {
          throw new Error(JSON.stringify(data));
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],

  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: "SECRET_JWT_ANY_TEXT",

  callbacks: {
    // async signIn(user) {
    //   //console.log("user login",user)
    //   if (user && user.account && user.account.provider === "google") {
    //     try {
    //       const { name, email, picture } = user.profile;
    //       console.log("g details- ",name,email,picture)
    //       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/customer-social-login`, {
    //         name : name,
    //         email: email,
    //         profile_image: picture,
    //         type: "google",

    //       });
    //       console.log("google in try ",response.data)

    //       if (response.status === 200) {
    //         return true;
    //       } else {
    //         return false
    //       }

    //     } catch (error) {
    //       if (error.response.status != 200) {
    //         console.log("google log",error.response.data);
    //         return false,{message: "error in glogin"}
    //       }
    //       //throw { error: 'Error occurred during sign in' };
    //     }
    //   }
    //   return true;
    // },

    async signIn({ account, profile }) {
      console.log("sign in account",account)
      console.log("sign in account",profile)
      if (account.provider === "google" && account.provider === "facebook") {
        try {
            const { name, email, picture } = profile;
            //console.log("g details- ",name,email,picture)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/customer-social-login`, {
              name : name,
              email: email,
              profile_image: picture,
              type: account.provider,
  
            });
            //console.log("google in try ",response.data)
  
            // if (response.status === 200) {
            //   return true;
            // } 

            if (response.status === 200) {
              console.log("response.status signIn",response.status)
              // Return the session object with additional data

              return true
            } 


  
          } catch (error) {
            console.log("google log CATCH signIn",error.response.data);
            throw new Error(error.response.data.message);

            // throw new Error(JSON.stringify(error.response.data.message));
            // return false

            // if (error.response.status != 200) {
            //   return false
            // }
            //throw { error: 'Error occurred during sign in' };
          }

        //return profile.email_verified && profile.email.endsWith("@example.com")
      }

      return true // Do different verification for other providers that don't have `email_verified`
    },

    async jwt({ token, user,profile,account }) {
      //  console.log("jwt token",token)
        //console.log("jwt user",user)
      //  console.log("jwt profile",profile)
      //  console.log("jwt account",account)

      //  if (account?.provider === "google") {
      //    token.accessToken = "hi this is token"
      //  }

       if (account?.provider === "google" && account.provider === "facebook") {
        try {
          const { name, email, picture } = profile;
          //console.log("g details- ",name,email,picture)
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/customer-social-login`, {
            name : name,
            email: email,
            profile_image: picture,
            type: account?.provider ,

          });
          //console.log("google in try jwt",response.data)

      

          if (response.status === 200) {
          
            token.name = response.data.name
            token.email = response.data.email
            token.token = response.data.token
            user.id = response.data.id
            token.message = response.data.message
          }



        } catch (error) {
         // console.log("google log CATCH jwt",error.response.data);

        }
      }
      return { ...token, ...user };
    },

    async session({ session, token,user }) {
      // console.log("session session",session)
      // console.log("session token",token)
      // console.log("session user",user)
      
      session.user = token; // Setting token in session
      return session;
    },

    async signOut({ ...args }) {
      // Add your logout logic here
      // You can check `args` to access the session or other details
      // For example:
      console.log("Signing out", args);

      // Perform your logout logic based on the token change
      if (args.oldStatus && args.oldStatus.user && args.oldStatus.user.token !== args.status.user.token) {
        // Logout the user
        // Add your logout code here (e.g., clear cookies, revoke tokens, etc.)
        console.log("User token changed. Logging out...");
      }

      // Return the default signOut callback result
      return await NextAuth.options.callbacks.signOut(args);
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },
});


export { handler as GET, handler as POST };
