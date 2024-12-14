'use client';
import React from 'react'
import { useState,useEffect } from "react"
import { IoMdClose } from 'react-icons/io'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import MultiRangeSlider from '../MultiRangeSlider';
import ListingFilter from '../ListingFilter'
import { usePathname } from 'next/navigation'

import styles from '@/styles/FullSideFilterList.module.scss'
import { useRouter } from "next/navigation";


const fetcher = (...args) => fetch(...args).then(res => res.json())

const FullSideFilterList = ({data,filterlocation,getLocation,getCategories,getLangauges,getGenres,getInstrument,getPrice,mobFilter,setMobFilter,getType}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const menuLocation = searchParams.get('location');
    const menuLocationArray = menuLocation ? [menuLocation] : [];
    const arrFilterlocation = filterlocation ? [filterlocation] : [];
    console.log("arrFilterlocation",arrFilterlocation)

    const searchBy = searchParams.get('from');
    const searchcatagoryId = searchParams.get('catagoryid');

    console.log("searchBy",searchBy)
    console.log("searchcatagoryId",searchcatagoryId)



    

    const pathname = usePathname()
    const trimmedPathname = pathname.substring(1);
    const newtrimmedPathname = pathname.substring(pathname.lastIndexOf('/')).replace(/^\//, '');
    
    const citytrimmedPathname = pathname.substring(1);
    const getmiddlecityname = citytrimmedPathname.split('/');
    const middlecityname = getmiddlecityname[0]; // "kolkata"
    const arrmiddlecityname = middlecityname ? [middlecityname] : [];
    //console.log("middlecityname", arrmiddlecityname);

    //console.log("pathname filter list",trimmedPathname)
    //console.log("mobFilter",mobFilter)
    //console.log("menuLocationArray",menuLocationArray)

    //const [filterMenu, setFilterMenu] = useState(mobFilter);

    // const toggleFilterMenu=()=>{
    //     setFilterMenu(true); 
    // }
    const hideFilterMenu=()=>{
        setMobFilter(false)
    }
    //console.log("filterMenu",filterMenu)

    //const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/filter`, fetcher)
    // console.log("filter",data)

    const [locationsearchQuery,setLocationsearchQuery] = useState('');
    const [categorysearchQuery, setCategorySearchQuery] = useState('');
    const [langaugesearchQuery, setLangaugeSearchQuery] = useState('');
    const [genressearchQuery, setGenresSearchQuery] = useState('');
    const [instrumentsearchQuery, setInstrumentSearchQuery] = useState('');

    const [locationdisplayIndex, setLocationDisplayIndex] = useState(10);
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

      // location select data

      const [locationlist,setLocationlist]= useState([])       
      const handlelocationCheckbox = (cityId) => {
        if (locationlist.includes(cityId)) {
            setLocationlist((prevLocation) => prevLocation.filter((checkbox) => checkbox !== cityId));         
        } else {
            setLocationlist((prevLocation) => [...prevLocation, cityId]);
        }
      
      };

      const clearAllLocations = () => {
        setLocationlist([]);
      };
      

      useEffect(() => {
       //console.log("Menu Clicked ")
       if (middlecityname != 'studio' || middlecityname != 'creator') {

           setLocationlist(arrFilterlocation.concat(arrmiddlecityname))
       }
      }, [menuLocation,filterlocation,middlecityname]);

    //   useEffect(() => {
    //     setLocationlist(arrFilterlocation)
    //   }, [arrFilterlocation])
      
      



      //console.log("location data",locationlist)

        //category select data
      const [category,setCategory]= useState([])       
      const handleCategoryCheckbox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategory([...category, value]);
        } else {
            setCategory(category.filter((checkbox) => checkbox !== value));
        }
      };

      const clearAllCategory = () => {
        setCategory([]);
      };

      //console.log("selected categorary",category)

      // langauge select data
      const [langauge,setLangauge]= useState([])       
      const handlelangaugeCheckbox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setLangauge([...langauge, value]);
        } else {
            setLangauge(langauge.filter((checkbox) => checkbox !== value));
        }
      };

      const clearAllLangauge = () => {
        setLangauge([]);
      };

      //genres select data

      const [genres,setGenres]= useState([])       
      const handleGenresCheckbox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setGenres([...genres, value]);
        } else {
            setGenres(genres.filter((checkbox) => checkbox !== value));
        }
      };

      const clearAllGenres = () => {
        setGenres([]);
      };

      //instrument list

      const [instrument,setInstrument]= useState([])       
      const handleInstrumentCheckbox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setInstrument([...instrument, value]);
        } else {
            setInstrument(instrument.filter((checkbox) => checkbox !== value));
        }
      };

      const clearAllInstrument = () => {
        setInstrument([]);
      };

      // price range

      const [minPrice,setMinPrice] = useState('')
      const [maxPrice,setMaxPrice] = useState('')


      //type 
      const [typeSelected,setTypeSelected] = useState([]);
      const handleTypeClick = (buttonValue) => {
        if (typeSelected.includes(buttonValue)) {
            setTypeSelected(typeSelected.filter((btn) => btn !== buttonValue));
        } else {
            setTypeSelected([...typeSelected, buttonValue]);
        }
      };

       console.log("trimmedPathname",trimmedPathname)
     //  console.log("newtrimmedPathname",newtrimmedPathname)
    //   console.log("middlecityname",middlecityname)
    //   console.log("arrmiddlecityname",arrmiddlecityname)

      useEffect(() => {

        if (trimmedPathname === 'audio-studio') {
            setLocationlist([])
        }

        if (trimmedPathname === 'studio' || trimmedPathname === 'creator' ) {
            setTypeSelected(trimmedPathname)
            setLocationlist(arrFilterlocation)
        } 

        //
        if ( newtrimmedPathname === 'studio' || newtrimmedPathname === 'creator') {
            setTypeSelected(newtrimmedPathname)
            //setLocationlist(arrFilterlocation.concat(arrmiddlecityname))
        } 
        //
        if ( middlecityname === 'studio' || middlecityname === 'creator') {
            setTypeSelected(arrmiddlecityname)
        } 

        

       }, [trimmedPathname,newtrimmedPathname,middlecityname]);

//     useEffect(() => {
//     const typeToCheck = trimmedPathname || newtrimmedPathname; // Use the first non-empty value
//     console.log("typeToCheck",typeToCheck)
//     if (typeToCheck === 'studio' || typeToCheck === 'creator') {
//         setTypeSelected(typeToCheck);
//     }
// }, [trimmedPathname, newtrimmedPathname]);

        console.log("category",category)
        useEffect(() => {
            if (searchBy === "search") {
                setCategory(searchcatagoryId || '')
            }
        }, [router])

       
      //console.log("typeSelected",typeSelected)

      //console.log("min price",minPrice)
      getLocation(locationlist)
      getCategories(category)
      getLangauges(langauge)
      getGenres(genres)
      getInstrument(instrument)
      getPrice(minPrice,maxPrice)
      getType(typeSelected)
  return (
        <div className={`${mobFilter ? 'showFilterMenu' : ''} responsiveFilterMenu lg:w-[280px] xl:w-[380px] md:w-[230px] w-full pe-3  sticky top-0 left-0 md:border-r border-border-color`}> 
            <div className="filter__content px-4 pt-2 pb-4 md:p-0 relative">  
                <button onClick={hideFilterMenu} className="w-[34px] h-[34px] rounded-full shadow-xl bg-_gray-light border flex justify-center items-center ml-auto md:hidden">
                    <IoMdClose className="text-2xl text-_dark"/>
                </button>
                <div className="scrollbox"> 
                    {/* <ListingFilter /> */}


                    <div className="pb-8">

                    <>
                <p className="text-base md:text-lg lg:text-xl font-semibold text-_dark pt-5 lg:pt-8">Type</p>
                    <div className="mt-4 flex flex-wrap flex-row items-start"> 
                        <span onClick={() => handleTypeClick('studio')} className={`inline-flex items-center px-3 py-1 bg-_gray-light border border-border-color text-_gray rounded-sm me-2 mb-2 cursor-pointer ${typeSelected.includes('studio') ? `bg-_green border-_green text-white ${styles.active__type}` : ''}`}>Studio</span>
                        <span onClick={() => handleTypeClick('creator')} className={`inline-flex items-center px-3 py-1 bg-_gray-light border border-border-color text-_gray rounded-sm me-2 mb-2 cursor-pointer ${typeSelected.includes('creator') ? `bg-_green border-_green text-white ${styles.active__type}` : ''}`}>Creator</span>          
                    </div>
                </>






            {/* location list */}
            {data?.city_list && (
                <>
                <div class="flex items-center justify-between">
                <p className="text-base md:text-lg lg:text-xl font-semibold text-_dark pt-5 lg:pt-8">Location's</p>
                <button
                onClick={clearAllLocations}
                className="text-sm lg:text-base font-medium text-red-600 mt-2 lg:mt-3 xl:mt-4 hover:text-red-800 transition-all duration-300"
                >
                Clear All
                </button>
                </div>
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
                    <span key={index} onClick={() => handlelocationCheckbox(location.city_name.toLowerCase().replace(/ /g, '-'))} className={`inline-block px-3 py-1 bg-_gray-light text-_dark rounded-sm me-2 mb-2 cursor-pointer ${locationlist.includes(location.city_name.toLowerCase().replace(/ /g, '-') ) ? 'bg-blue-600 text-white' : ''}`}>{location.city_name}</span>
                ))}
                </div>
                {locationdisplayIndex < filteredLocation.length && (
                <button onClick={()=> handleClick(10,'location')} className='text-sm lg:text-base font-medium  text-_yellow mt-2 lg:mt-3 xl:mt-4 hover:text-_green transition-all duration-300'>View More</button>
                )}
                </>
                )}
                </>

            )}
            {/* category_list */}
            {data?.category_list && (
                <>           
                <hr className="my-4 bg-border-color"/>
                <div class="flex items-center justify-between"> 
                <p className="text-base md:text-lg lg:text-xl font-semibold text-_dark pt-5 lg:pt-8">Categories</p>                                 
                {/* <button
                onClick={clearAllCategory}
                className="text-sm lg:text-base font-medium text-red-600 mt-2 lg:mt-3 xl:mt-4 hover:text-red-800 transition-all duration-300"
                >
                Clear All
                </button> */}
                </div>
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
                <input  onChange={handleCategoryCheckbox} id={category.category_name} type="checkbox" value={category._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor={category.category_name} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category.category_name}</label>
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
                <input onChange={handlelangaugeCheckbox} id={langauge.language_name} type="checkbox" value={langauge._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor={langauge.language_name} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{langauge.language_name}</label>
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
                <input onChange={handleGenresCheckbox} id={genres.genres_name} type="checkbox" value={genres._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor={genres.genres_name} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{genres.genres_name}</label>
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
            <input onChange={handleInstrumentCheckbox} id={instrument.instrument_name} type="checkbox" value={instrument._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor={instrument.instrument_name} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{instrument.instrument_name}</label>
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
                {/* <span className="text-_green text-base lg:text-lg font-semibold">APPLY</span> */}
            </div>
 
            <MultiRangeSlider
            min={0}
            max={1000000}
            onChange={({ min, max }) => {
                //console.log(`min = ${min}, max = ${max}`)
                setMinPrice(min)
                setMaxPrice(max)
            }}
            />
        </div>




                </div>
            </div>
        </div>
  )
}

export default FullSideFilterList