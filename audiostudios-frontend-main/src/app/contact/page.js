import React from 'react'
import ContactForm from '@/components/ContactForm'
export const metadata = {
    title: 'Contact Us',
    description: 'Contact Us'
}

async function contactGSContent() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/global-settings`,{ cache: 'no-store' })
    return res.json();
}

const Contact = async () => {

    const contactGSData = await contactGSContent()

  return (
    <main>
        {/* Header Wrapper Start */}
        <header className='header__wrapper py-10 sm:py-14 md:py-16 lg:py-20 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url("/images/banners/contact-bg.webp")`, boxShadow:'inset 0 0 0 2000px rgba(0,0,0,0.75)' }}>
            <div className="container mx-auto">
                <div className="text-center">
                    <h1 className='text-xl sm:text-xl md:text-3xl lg:text-4xl font-semibold text-white'>Contact Us</h1>
                </div>
            </div>
        </header>
        {/* Header Wrapper End */}

        {/* Contact Content Start */}
        <section className="py-10 md:py-15 lg:py-20">
            <div className="container">
                <div className="flex flex-wrap max-w-[1000px] mx-auto">
                    <div className="w-full md:w-[40%] md:pr-3 lg:pr-5">
                        <div className="bg-_green p-5 lg:p-8 text-white">
                            <h1 className="text-white text-base lg:text-xl font-semibold mb-4">Contact Us</h1>

                            <ul class="">   
                                {contactGSData.contact_phone && contactGSData.contact_phone.value && (
                                <li class="mb-4 flex">
                                    <figure class="mb-0 w-6 pt-2">
                                        <img src="/images/icons/call-white.svg" width="16" height="16" alt="Call"/>
                                    </figure>
                                    <div class="ps-2 w-[calc(100%-24px)]">
                                        <a class="text-sm lg:text-base text-white fw-medium text-lowercase hover:text-_teal" href={`tel:${contactGSData?.contact_phone?.value}`}>{contactGSData?.contact_phone?.value}</a> <br/>
                                       
                                    </div>
                                </li> 
                                )}
                                {/* <li>
                                    <p class="text-base lg:text-xl font-semibold mb-4 mt-6">Other Details</p>
                                </li>  */}
                                {/* <li class="mb-3 flex"> 
                                    <figure class="mb-0 w-6 pt-2">
                                        <img src="/images/icons/pin-white.svg" width="14" height="14" alt="phone"/>
                                    </figure>
                                    <div class="ps-2 w-[calc(100%-24px)]">
                                        <address class="text-white text-sm lg:text-base fw-medium mb-0 pe-md-5 font-normal" style={{fontStyle:'normal'}}>
                                            Office 902, 9th Floor Al Saqr Business Tower, 
                                            Sheikh Zayed Road, Dubai, Near to Emirates 
                                            Metro station-Dubai
                                        </address> 
                                    </div>
                                </li>   */}
                                {contactGSData.contact_email && contactGSData.contact_email.value && (
                                <li class="mb-2 flex"> 
                                    <figure class="mb-0 w-6 pt-2">
                                        <img src="/images/icons/mail-white.svg" width="16" height="16" alt="mail"/>
                                    </figure>
                                    <div class="ps-2 w-[calc(100%-24px)] "> 
                                        <a href={`mailto:${contactGSData.contact_email.value}`} class="text-sm lg:text-base text-lowercase fw-medium text-white hover:text-_teal">{contactGSData.contact_email.value}</a> 
                                    </div>
                                </li>  
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-[60%] md:pl-3 lg:pl-5 mt-5 md:mt-0">

                       
                    <ContactForm/>

                    </div>
                </div>
            </div>
        </section>
        {/* Contact Content End */}




    </main>
  )
}

export default Contact
