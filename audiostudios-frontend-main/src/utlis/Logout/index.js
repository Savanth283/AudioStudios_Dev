import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const handleSignOut =  async () => {
  const router = useRouter()

    const data = await signOut({ redirect: false, callbackUrl: '/' })
    router.push(data.url)
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/logout?customer_id=${sesson.user.id}`, {
        headers: {
          Authorization: sesson?.user?.token, // Replace with your actual token
          'Content-Type': 'application/json'
        }
      });
      
      // Handle the response
      console.log("loged out",response.data);
    } catch (error) {
      console.error("loged out error",error);
    }  

  }