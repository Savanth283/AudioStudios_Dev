 //"use client"
// import useSWR from 'swr'
import Image from 'next/image'
import axios from 'axios'
import StudioCard from '../components/StudioCard'
import Link from 'next/link'
import Search from "../components/Search"
//import CurrentLocation from "../components/currentLocation/CurrentLocation"
import HomeBanner from "../components/HomeBanner"
import HomeBannerMiddle from '@/components/HomeBanner/HomeBannerMiddle' 
import CreatorsListCard from '@/components/CreatorsListCard/CreatorsListCard'
// import GetLocation from '@/components/Location/GetLocation'

import WelcomeVideo from '@/components/WelcomeVideo/WelcomeVideo'

// async function StudioListData() {

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio-list?&limit=4`)
//     return res.json();
// }

// async function CreatorListData() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/creator-list?&limit=4`)
//     return res.json();
// }

// export const metadata = {
//     title: "Audiostudio | World's first chain of Recording Studios & Audio Creators",
//     description: `Audiostudios, the first chain of recording studios and audio creators in the world, started its journey in Kolkata. Whether you are a solo artist, a music creator, an audio creator, or the owner of a recording studio, don't wait, start your creative journey with Audiostudios.`,
//     keywords: ['music recording studio', 'audio recording studio', 'voice recording studio', 'voice over artist', 'music creator'],
//   }

  const homeData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms?cms_slug=home`,{ cache: 'no-store' });
    return res.json();
}

async function HomeBannerAdd() {
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=top`,{ cache: 'no-store' })
        return res.json();

    }

async function HomeBannermiddleAdd() {
   
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=home-middle`,{ cache: 'no-store' })
        return res.json();
    }

async function HomeSearchTitle() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/global-settings`,{ cache: 'no-store' })
    return res.json();
}


//const fetcher = (...args) => fetch(...args).then(res => res.json())
//const fetcher = url => axios.get(url).then(res => res.data)

 //for seo 
 export async function generateMetadata() {
    const homeSEOData = await homeData();

    return {
      title: homeSEOData.meta_title,
      description: homeSEOData.meta_description,
      keywords: homeSEOData.meta_keyword
    }
  }

const Home = async () => {
    // const studiolist = await StudioListData();
    // const creatorlist = await CreatorListData();
    const HomeBannerAddList = await HomeBannerAdd();
    const HomeBannermiddleAddList = await HomeBannermiddleAdd();
    const HomeSearchTitleData = await HomeSearchTitle();
    //const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/banner-list?position=top`, fetcher)

    // console.log("swrdata",data)

    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);

    // useEffect(() => {
    //   // Function to handle success
    //   const successCallback = (position) => {
    //     setLatitude(position.coords.latitude);
    //     setLongitude(position.coords.longitude);
    //   };

    //   // Function to handle error
    //   const errorCallback = (error) => {
    //     console.error('Error retrieving location:', error);
    //   };

    //   // Retrieve the current location
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    //   } else {
    //     console.error('Geolocation is not supported by this browser.');
    //   }
    // }, []);

    // console.log("latitude",latitude,"longitude",longitude)
 

    return (
        <>
           {/* <WelcomeVideo/> */}
          {/* <GetLocation/> */}
            {/* ----------- Filter Wrapper Start ------------- */} 
            <div className="pb-4 pb:md-5 hidden lg:block">
                <div className="px-4 lg:px-5 pb-4 pt-5 md:pt-7 lg:pt-10 text-center bg-_green-900 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('/images/banners/filter-bg-image.jpg')` }}>
                    <div className="container mx-auto">
                        <h1 className="text-base lg:text-3xl font-bold text-white mb-6">{HomeSearchTitleData?.home_search_title_one?.value}</h1>
                        <div className="lg:max-w-[900px] 2xl:max-w-full mx-auto"> 
                            <Search />
                            <p className="mt-5 md:mt-7 lg:mt-7 uppercase text-white font-medium text-sm md:text-base">
                            {HomeSearchTitleData?.home_search_title_two?.value}
                            </p>
                        </div>
                        <p className="text-sm lg:text-lg text-center text-white mt-2 md:mt-3 lg:mt-4 mb-4 md:mb-5">{HomeSearchTitleData?.home_search_title_three?.value}</p>

                    </div>
                </div>
            </div>

            <div className="lg:hidden">
                <div className="container"> 
                    <Search />
                </div>
            </div>
            {/* ----------- Filter Wrapper End ------------- */}


            {/* <div className="container mx-auto">
                <img src="/images/banners/sliding-banner-01.jpg" className='w-full' alt="Banner" />
            </div>  */}

            <div className="relative">
                <HomeBanner HomeBannerAddList={HomeBannerAddList} />

                {/* ----------- Studio List Wrapper Start ----- */}          

                <StudioCard/>
                {/* -------- Banner -------------- */}
                <HomeBannerMiddle HomeBannermiddleAddList={HomeBannermiddleAddList}/>

                {/* ----------- Creator List Wrapper Start ----- */}
                {/* <div className="py-5 md:py-7 mb-4">
                    <div className="container mx-auto"> 
                        <div className='flex sm:block justify-between items-center'>
                            <h2 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-base text-_dark fw-bold font-bold">Nearby Creators</h2>
                            <Link href="creator" className='sm:hidden text-[11px] font-semibold rounded-sm px-3 py-2 bg-_gray-light text-_green transition-all duration-300 hover:text-_teal focus:text-_teal focus:bg-_gray'>View All</Link>
                        </div>
                        <div className="grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-start mt-4 lg:mt-6">
                            {
                                creatorlist.data.map((creator, index) => {   
                                    return <CreatorsListCard key={index} creatorlist={creator} />
                                })
                            } 
                        </div>
                    </div>
                </div> */}
                <CreatorsListCard/>


                {/* <Image
                    src={'/images/song-water-image.webp'}
                    width={600} height={1000}
                    alt='Song Alt Image'
                    className='absolute bottom-0 left-0 z-0 pointer-events-none'
                /> */}
            </div>
            
        </>
    )
}
export default Home
