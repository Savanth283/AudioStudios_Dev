'use client';
import React, { useState } from "react"; 
import MultiRangeSlider from "../MultiRangeSlider";
import useSWR from 'swr'
 

const fetcher = (...args) => fetch(...args).then(res => res.json())
const ListingFilter =()=>{

    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/filter`, fetcher)
    //console.log("filter",data)

    const [locationsearchQuery,setLocationsearchQuery] = useState('');
    const [categorysearchQuery, setCategorySearchQuery] = useState('');
    const [langaugesearchQuery, setLangaugeSearchQuery] = useState('');
    const [genressearchQuery, setGenresSearchQuery] = useState('');
    const [instrumentsearchQuery, setInstrumentSearchQuery] = useState('');

    const [locationdisplayIndex, setLocationDisplayIndex] = useState(5);
    const [categorydisplayIndex, setCategoryDisplayIndex] = useState(5);
    const [langaugedisplayIndex, setLangaugeDisplayIndex] = useState(5);
    const [genresdisplayIndex, setGenresDisplayIndex] = useState(5);
    const [instrumentdisplayIndex, setInstrumentDisplayIndex] = useState(5);

    const handleClick = (value,listtype) => {
        //console.log("value",value)
        if (listtype === "category") {
            setCategoryDisplayIndex(prevIndex => prevIndex + value);
        } else if (listtype === "language") {
            setLangaugeDisplayIndex(prevIndex => prevIndex + value);
        } else if (listtype === "genres") {
            setGenresDisplayIndex(prevIndex => prevIndex + value);
        } else if (listtype === "instrument") {
            setInstrumentDisplayIndex(prevIndex => prevIndex + value);
        } else if (listtype === "location") {
            setLocationDisplayIndex(prevIndex => prevIndex + value)
        }
    };



    const filteredLocation = data?.city_list.filter(location =>
        location.city_name.toLowerCase().includes(locationsearchQuery.toLowerCase())
      );
    
      const filteredCategory = data?.category_list.filter(category =>
        category.category_name.toLowerCase().includes(categorysearchQuery.toLowerCase())
      );

      const filteredlangauges = data?.language_list.filter(language =>
        language.language_name.toLowerCase().includes(langaugesearchQuery.toLowerCase())
      );

      const filteredgenresdis = data?.genres_list.filter(genresdis =>
        genresdis.genres_name.toLowerCase().includes(genressearchQuery.toLowerCase())
      );

      const filteredinstrument = data?.instrument_list.filter(instrument =>
        instrument.instrument_name.toLowerCase().includes(instrumentsearchQuery.toLowerCase())
      );


    return(
        <div className="pb-8">
            {/* location list */}
            {data?.city_list && (
                <>
                <p className="text-base md:text-lg lg:text-xl font-semibold text-_dark pt-5 lg:pt-8">Location's</p>
                <input type="text" value={locationsearchQuery}
                onChange={(e)=> {setLocationsearchQuery(e.target.value);setLocationDisplayIndex(5);}} placeholder="Search Location" name="search" className="form-control" />
                {/* <div className="mt-1 text-_green">
                    <span className="text-_dark font-medium pe-1">Locations</span>
                    in Kolkata, West Bengal, India
                </div> */}
                {filteredLocation.length > 0 && (
                    <>
                <div className="mt-4">
                {filteredLocation?.slice(0,locationdisplayIndex).map((location, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-_gray-light text-_dark rounded-sm me-2 mb-2">{location.city_name}</span>
                ))}
                </div>
                {locationdisplayIndex < filteredLocation.length && (
                <button onClick={()=> handleClick(5,'location')} className='text-sm lg:text-base font-medium  text-_yellow mt-2 lg:mt-3 xl:mt-4 hover:text-_green transition-all duration-300'>View More</button>
                )}
                </>
                )}
                </>

            )}
            {/* category_list */}
            {data?.category_list && (
                <>           
                <hr className="my-4 bg-border-color"/>
                <p className="text-base md:text-lg lg:text-xl font-semibold text-_dark pt-5 lg:pt-8">Categories</p>                                 
                
                <input
                type="text"
                value={categorysearchQuery}
                onChange={(e)=> {setCategorySearchQuery(e.target.value);setCategoryDisplayIndex(5);}}
                placeholder="Search for category"
                className="form-control"
                />
                 {filteredCategory.length > 0 && (
                    <>
                {filteredCategory?.slice(0,categorydisplayIndex).map((category, index) => (
                <div key={index} className="flex items-center mb-4 mt-3">
                <input id="default-checkbox" type="checkbox" value={category.category_name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category.category_name}</label>
                </div>
                ))}
                {categorydisplayIndex < filteredCategory.length && (
                <button onClick={()=> handleClick(5,'category')} className='text-sm lg:text-base font-medium  text-_yellow mt-2 lg:mt-3 xl:mt-4 hover:text-_green transition-all duration-300'>View More</button>
                )} 
                </>
                 )}                 
                </>
            )}

            {/* language_list */}
            {data?.language_list && (
                <>           
                <hr className="my-4 bg-border-color"/>
                <p className="text-base md:text-lg lg:text-xl font-semibold text-_dark pt-5 lg:pt-8">langauge's</p>
                
                <input
                type="text"
                value={langaugesearchQuery}
                onChange={(e)=> {setLangaugeSearchQuery(e.target.value);setLangaugeDisplayIndex(5);}}
                placeholder="Search for language"
                className="form-control"
                />
                {filteredlangauges.length > 0 && (
                    <>
                {filteredlangauges?.slice(0,langaugedisplayIndex).map((langauge, index) => (
                <div key={index} className="flex items-center mb-4 mt-3">
                <input id="default-checkbox" type="checkbox" value={langauge.language_name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{langauge.language_name}</label>
                </div>
                ))}
                {langaugedisplayIndex < filteredlangauges.length && (
                <button onClick={()=> handleClick(10,'language')} className='text-sm lg:text-base font-medium  text-_yellow mt-2 lg:mt-3 xl:mt-4 hover:text-_green transition-all duration-300'>View More</button>
                )}
                </>
                )}
                </>
            )}

            {/* genres_list */}
            {data?.genres_list && (
                <>           
                <hr className="my-4 bg-border-color"/>
                <p className="text-base md:text-lg lg:text-xl font-semibold text-_dark pt-5 lg:pt-8">Genres's</p>
                
                <input
                type="text"
                value={genressearchQuery}
                onChange={(e)=> {setGenresSearchQuery(e.target.value);setGenresDisplayIndex(5);}}
                placeholder="Search for genres"
                className="form-control"
                />
                {filteredgenresdis.length > 0 && (
                    <>                
                {filteredgenresdis.slice(0,genresdisplayIndex).map((genres, index) => (
                <div key={index} className="flex items-center mb-4 mt-3">
                <input id="default-checkbox" type="checkbox" value={genres.genres_name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label for="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{genres.genres_name}</label>
                </div>
                ))}
                {genresdisplayIndex < filteredgenresdis.length && (
                <button onClick={()=> handleClick(10,'genres')} className='text-sm lg:text-base font-medium  text-_yellow mt-2 lg:mt-3 xl:mt-4 hover:text-_green transition-all duration-300'>View More</button>
                )}
                </>
                )}
                </>
            )}


            {/* instrument_list */}
            {data?.instrument_list && (
            <>           
            <hr className="my-4 bg-border-color"/>
            <p className="text-base md:text-lg lg:text-xl font-semibold text-_dark pt-5 lg:pt-8">Instrument's</p>
            
                <input
                type="text"
                value={instrumentsearchQuery}
                onChange={(e)=> {setInstrumentSearchQuery(e.target.value);setInstrumentDisplayIndex(5);}}
                placeholder="Search for instrument"
                className="form-control"
                />
            {filteredinstrument.length > 0 && (
                <>
            {filteredinstrument?.slice(0,instrumentdisplayIndex).map((instrument, index) => (
            <div key={index} className="flex items-center mb-4 mt-3">
            <input id="default-checkbox" type="checkbox" value={instrument.instrument_name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label for="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{instrument.instrument_name}</label>
            </div>
            ))}
            {instrumentdisplayIndex < filteredinstrument.length && (
            <button onClick={()=> handleClick(7,'instrument')} className='text-sm lg:text-base font-medium  text-_yellow mt-2 lg:mt-3 xl:mt-4 hover:text-_green transition-all duration-300'>View More</button>
            )}
            </>
            )}
            </>
            )}


            {/* Price range */}
            <hr className="my-4 bg-border-color"/>

            <div className="flex justify-between items-center mt-4 sm:mt-5">
                <span className="text-_dark text-base lg:text-lg font-semibold">Price</span>
                <span className="text-_green text-base lg:text-lg font-semibold">APPLY</span>
            </div>
 
            <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
            />
        </div>
    )
}

export default ListingFilter