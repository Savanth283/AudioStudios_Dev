export async function generateMetadata({ params}) {
  // read route params
  const location = params.location
  const locationStudio = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/city-seo-list?city=${location}`).then((res) => res.json())
  // console.log("locationStudio",locationStudio)
  // fetch data
  //const alllocation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms?cms_slug=${slug}`).then((res) => res.json())

  return {
    title: locationStudio.meta_title_studio || `Audiostudio | Best Recording Studio in ${location} | Top 10 Recording Studio in ${location}`,
    description: locationStudio.meta_description_studio || `Find the best recording studio in ${location} now. Each of these recording studios offers world-class recording facilities. Book any of these top recording studios in ${location}  with Audiostudios and experience the best deals`,
    keywords: locationStudio.meta_keyword_studio || `recording studio in ${location}, best recording studio in ${location}, top recording studio in ${location}, recording studio near ${location},`

  }

}

export default function locationstudioLayout({ children,params }) {
    // console.log("children",children)
    // console.log("params",params)
    // console.log("layout")

    return <section>{children}</section>
  }