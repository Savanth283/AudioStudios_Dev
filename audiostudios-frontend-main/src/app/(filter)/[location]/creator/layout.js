export async function generateMetadata({ params}) {
  // read route params
  const location = params.location
  const locationCreator = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/city-seo-list?city=${location}`).then((res) => res.json())
  //console.log("locationCreator",locationCreator)

 
  // fetch data
  //const alllocation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms?cms_slug=${slug}`).then((res) => res.json())

  return {
    title: locationCreator.meta_title_creator || `Audiostudio | Music recording studio in ${location} | Best creator in ${location} |
    Hire Creator in ${location}`,
    description: locationCreator.meta_description_creator || `Find the best Music recording studio in ${location} now. Let's search
    for top music creator and experience the best quality of assistance from our enlisted
    creators.`,
    keywords: locationCreator.meta_keyword_creator || `music recording studio in ${location}, music creator in ${location}`
  }
}



export default function locationLayout({ children,params }) {
    // console.log("children",children)
    // console.log("params",params)
    // console.log("layout")

    return <section>{children}</section>
  }