// export const dynamic = 'force-dynamic'
// export const revalidate = 0

// export async function generateSitemaps() {
//   // Fetch the total number of products and calculate the number of sitemaps needed
//   return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
// }


export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  async function BlogList() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`)
        return res.json();
    } catch (e) {
        return []
    }
  }

  async function getCityList() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/city-list`)
      return res.json();
    } catch (e) {
      return [
        
      ]
    }
  }

  // Fetch blog data
  const blogData = await BlogList();

  //city list
  const cityListData = await getCityList();

  const dynamicEntries = [
    // Add city list entries dynamically
    ...cityListData.map(city => ({
      url: `${baseUrl}/${city.cityName.toLowerCase().replace(/ /g, '-')}`, // Adjust the URL accordingly
      //changeFrequency: 'weekly', // Adjust the frequency accordingly
      priority: 0.8, // Adjust the priority accordingly
    })),
    // Add city by studio list entries dynamically
    ...cityListData.map(city => ({
      url: `${baseUrl}/${city.cityName.toLowerCase().replace(/ /g, '-')}/studio`, // Adjust the URL accordingly
      //changeFrequency: 'weekly', // Adjust the frequency accordingly
      priority: 0.8, // Adjust the priority accordingly
    })),
     // Add city by creator list entries dynamically
     ...cityListData.map(city => ({
      url: `${baseUrl}/${city.cityName.toLowerCase().replace(/ /g, '-')}/creator`, // Adjust the URL accordingly
      //changeFrequency: 'weekly', // Adjust the frequency accordingly
      priority: 0.8, // Adjust the priority accordingly
    })),
    // Add blog entries dynamically
    ...blogData.map(blog => ({
      url: `${baseUrl}/blog/${blog.slug}`, // Adjust the URL accordingly
      //changeFrequency: 'weekly', // Adjust the frequency accordingly
      priority: 0.8, // Adjust the priority accordingly
    })),
    
  ];

  const staticXml = [
    {
      url: baseUrl,
      //changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      priority: 1,
    },
    {
      url: `${baseUrl}/page/terms-and-condition`,
      priority: 1,
    },
    {
      url: `${baseUrl}/page/privacy-policy1`,
      priority: 1,
    }
  ]


    return [ ...staticXml, ...dynamicEntries ]
  }