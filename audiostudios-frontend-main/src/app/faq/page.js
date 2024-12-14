 
import CustomAccordion from "../../components/CustomAccordion/CustomAccordion";
import React from "react"; 
// import { Accordion } from "@/components/Accordion/Accordion";
export const metadata = {
  title: "FAQ",
};


async function faqData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faq`,{ next: { revalidate: 3600 } })
  return res.json();
}



const page = async () => {

  const listFaqData = await faqData();
  //console.log("listFaqData",listFaqData)
  return (
    <main>
      {/* Header Wrapper Start */}
      <header
        className="header__wrapper py-10 sm:py-14 md:py-16 lg:py-20 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url("/images/banners/about-page-header-bg.webp")`,
        }}
      >
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-xl sm:text-xl md:text-3xl lg:text-4xl font-semibold text-white">
              FAQ's
            </h1>
          </div>
        </div>
      </header>
      {/* Header Wrapper End */}

      <div className="py-10">
        <div className="container">
         {listFaqData && listFaqData.map((faq,index)=> {
          return (
            <div key={index}>
              <CustomAccordion
                title={faq.heading}
                content={faq.description}
              />
            </div>
          )
         })}
            

            {/* <CustomAccordion
              title="What are the benefits of partnering with PixMango for E-commerce Services?"
              content="Partnering with PixMango for E-commerce Services offers numerous benefits. Our expertise in Walmart Marketplace Management and Amazon Marketplace Management ensures enhanced visibility, streamlined operations, strategic marketing, optimized inventory, and improved customer engagement."
            />
            <CustomAccordion
              title="What are the benefits of partnering with PixMango for E-commerce Services?"
              content="Partnering with PixMango for E-commerce Services offers numerous benefits. Our expertise in Walmart Marketplace Management and Amazon Marketplace Management ensures enhanced visibility, streamlined operations, strategic marketing, optimized inventory, and improved customer engagement."
            />
            <CustomAccordion
              title="What are the benefits of partnering with PixMango for E-commerce Services?"
              content="Partnering with PixMango for E-commerce Services offers numerous benefits. Our expertise in Walmart Marketplace Management and Amazon Marketplace Management ensures enhanced visibility, streamlined operations, strategic marketing, optimized inventory, and improved customer engagement."
            />
            <CustomAccordion
              title="What are the benefits of partnering with PixMango for E-commerce Services?"
              content="Partnering with PixMango for E-commerce Services offers numerous benefits. Our expertise in Walmart Marketplace Management and Amazon Marketplace Management ensures enhanced visibility, streamlined operations, strategic marketing, optimized inventory, and improved customer engagement."
            /> */}
        </div>
      </div>
    </main>
  );
};

export default page;
