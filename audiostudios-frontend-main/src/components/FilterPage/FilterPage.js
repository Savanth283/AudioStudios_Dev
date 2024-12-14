'use client';

import ListingFilter from "@/components/ListingFilter"
import ListingStudio from "@/components/ListingStudio"

import { CiFilter } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { TiArrowSortedDown } from 'react-icons/ti'
import { HiCurrencyRupee } from 'react-icons/hi'
import { GrLineChart } from 'react-icons/gr'
import React,{ useState,useEffect, useRef } from "react"

import Search from "@/components/Search";
import FilteredList from "@/components/ListFilter/FilteredList";
import FullSideFilterList from "@/components/ListFilter/FullSideFilterList";
import { notFound } from 'next/navigation'



export async function generateStaticParams() {
    const pages = ['studio','creator','audio-studio']
   
    return pages.map((page) => ({
      slug: page,
    }))
  }




const FilterPage = ({filterlocation,data,headerFooterdata}) => {
    //const slug = params.type
    // console.log("headerFooterdata",headerFooterdata)

    //console.log("slug",slug);
    // const [filterMenu, setFilterMenu] = useState(false);

    // const toggleFilterMenu=()=>{
    //     setFilterMenu(true); 
    // }
    // const hideFilterMenu=()=>{
    //     setFilterMenu(false)
    // }


    //short section
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortOpenRef = useRef(null)
    const toggleSortOpen = () => {
        setIsSortOpen(!isSortOpen);
    };


    useEffect(() => {
        const handleSortOpenClickOutside = (event) => {
            if (sortOpenRef.current && !sortOpenRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
          };
      
          document.body.addEventListener('click', handleSortOpenClickOutside);
      
          return () => {
            document.body.removeEventListener('click', handleSortOpenClickOutside);
          };
    }, []);

    //filter mob 

    const [mobFilter,setMobFilter] = useState(false)
    const handleMobFilter = () => {
        setMobFilter(true)
    }

    const [locationList,setlocationList] = useState('')
    const handleGetLocation = (locations) => {
        setlocationList(locations);
    }

    const [categoriesList,setCategoriesList] = useState('')
    const handleGetCategories = (categories) => {
        setCategoriesList(categories);
    }

    const [langaugeList,setLangaugeList] = useState('')
    const handleGetlangauges = (langauge) => {
        setLangaugeList(langauge);
    }

    const [genresList,setGenresList] = useState('')
    const handleGetgenres = (genres) => {
        setGenresList(genres);
    }

    const [instrumentList,setinstrumentList] = useState('')
    const handleInstrument = (instrument) => {
        setinstrumentList(instrument);
    }

    const [lowPrice,setLowPrice] = useState('')
    const [highPrice,setHighPrice] = useState('')
    const handlePrice = (low,high) => {
        setLowPrice(low);
        setHighPrice(high);
    }
    const [filterType,setFilterType] = useState('')
    const handleType = (type) => {
        setFilterType(type)
    }
    


    //sort by

    const [sortby,setSortBy] = useState('')//Sort By
    const handleSort = (filter) => {
        setSortBy(filter);
        setIsSortOpen(!isSortOpen);
    }
    //console.log("sortby",sortby)
    // console.log("locationList in home",locationList)
    // console.log("categoriesList in home ",categoriesList)
    // console.log("langaugeList in home",langaugeList)
    // console.log("genresList in home",genresList)
    // console.log("instrumentList in home" ,instrumentList)
    // console.log("price in home",lowPrice,highPrice)
    //console.log("filterType",filterType)

    const [listLength,setListLength] = useState('')

    const listDataCountinParent = (count) => {
        setListLength(count)
    }
    //console.log("listLength",listLength)
  return (
     <>
            {/* Search Box */}
            <div className="py-3 sm:py-5 md:bg-_dark">
                <div className="container mx-auto">
                    <div className="lg:max-w-[900px] 2xl:max-w-full mx-auto"> 
                        <Search />
                    </div>
                </div>
            </div>


            {/* Main Lisiting Wrapper Start */}
            <div className="pb-4">
                <div className="container mx-auto">
                    <div className="flex flex-row flex-wrap items-start">
                        {/* Filter Wrapper */}
                        {/* <div className={`${filterMenu ? 'showFilterMenu' : ''} responsiveFilterMenu lg:w-[280px] xl:w-[380px] md:w-[230px] pe-3`}> 
                            <div className="filter__content px-4 pt-2 pb-4 md:p-0 relative">  
                                <button onClick={hideFilterMenu} className="w-[34px] h-[34px] rounded-full shadow-xl bg-_gray-light border flex justify-center items-center ml-auto md:hidden">
                                    <IoMdClose className="text-2xl text-_dark"/>
                                </button>
                                <div className="scrollbox"> 
                                    <ListingFilter />
                                </div>
                            </div>
                        </div> */}
                        <FullSideFilterList  
                        data={data}
                        filterlocation={filterlocation}
                        getLocation={handleGetLocation}
                        getCategories={handleGetCategories}
                        getLangauges={handleGetlangauges}
                        getGenres={handleGetgenres}
                        getInstrument={handleInstrument}
                        getPrice={handlePrice}
                        mobFilter={mobFilter}
                        setMobFilter={setMobFilter}
                        getType={handleType}
                        />

                        {/* Main Lisitng */}
                        <div className="lg:w-[calc(100%-280px)] xl:w-[calc(100%-380px)] md:w-[calc(100%-230px)] w-full md:pl-4">
                            <div className="bg-_gray-light p-3 rounded-md mt-4 noDataFilter">
                                <div className="sm:flex justify-between items-center">
                                    <div className="fs-sm sm:text-base text-_dark hidden md:block">
                                        <span className="text-_green font-medium me-2">{ listLength + ' Results Found'}</span>
                                        {/* <span>in Kolkata, West Bengal, India</span> */}
                                    </div>

                                    <div className="flex items-center justify-between mt-1 md:inline-flex md:mt-0">  
                                        {/* Responsiv Filter */}
                                        <button onClick={handleMobFilter}  className="border inline-flex items-center border-_dark text-_dark text-[13px] sm:text-base px-2.5 py-1.5 rounded-md md:hidden">
                                            <CiFilter className="text-xl text-_dark" />
                                            <span className="ps-2">Filter</span>
                                        </button> 


                                        <button onClick={toggleSortOpen} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
                                        className="inline-flex items-center border border-border-color text-_dark text-[13px] sm:text-base rounded-md w-[111px] py-1.5 px-2 sm:p-2.5 bg-white" type="button">
                                            {sortby || "Sort By"} <TiArrowSortedDown className="text-xl ml-2"/>
                                        </button>
                                        {isSortOpen && (
                                        <div ref={sortOpenRef} id="dropdown" className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-xl absolute right-0 mt-10 mr-2 w-44">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li className="border-b border-_gray-light">
                                                    <button onClick={()=>handleSort("popularity")} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                                                        <GrLineChart className="text-xl text-_green me-2" />
                                                        Popularity
                                                    </button>
                                                </li>
                                                <li className="border-b border-_gray-light">
                                                    <button onClick={()=>handleSort("HTL")} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                                                        <HiCurrencyRupee className="text-2xl text-_green" />
                                                        High to Low
                                                    </button>
                                                </li>
                                                <li className="border-b border-_gray-light">
                                                    <button onClick={()=>handleSort("LTH")} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                                                        <HiCurrencyRupee className="text-2xl text-_green" />
                                                        Low to High
                                                    </button>
                                                </li>
                                                <li className="border-b border-_gray-light">
                                                    <button onClick={()=>handleSort("SILVER")} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                                                        <img src="/images/icons/silver.svg" className="w-[20px] me-2" alt="coin" />
                                                        Silver
                                                    </button>
                                                </li>
                                                <li className="border-b border-_gray-light">
                                                    <button onClick={()=>handleSort("GOLD")} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                                                        <img src="/images/icons/gold.svg" className="w-[20px] me-2" alt="coin" />
                                                        Gold
                                                    </button>
                                                </li>
                                                <li className="border-b border-_gray-light">
                                                    <button onClick={()=>handleSort("PLATINUM")} className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100">
                                                        <img src="/images/icons/platinum.svg" className="w-[20px] me-2" alt="coin" />
                                                        Platinum
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        )}

                                    </div>
                                </div>

                            </div>

                            {headerFooterdata && (
                                <div className="pt-2 mt-2">
                                    <h2 className="text-xl sm:text-lg lg:text-2xl font-bold text-_dark capitalize">{headerFooterdata.header}</h2>
                                </div>
                            )}             
                            
                            <FilteredList
                            listDataCount={listDataCountinParent}
                            filterlocation={filterlocation}
                            locationList={locationList}
                            categoriesList={categoriesList}
                            langaugeList={langaugeList}
                            genresList={genresList}
                            instrumentList={instrumentList}
                            lowPrice={lowPrice}
                            highPrice={highPrice}
                            filterType={filterType}
                            sortby={sortby}
                             />

                            {headerFooterdata && (
                                <div className="pt-3 mt-2" >
                                    <div className="capitalize text-base" dangerouslySetInnerHTML={{ __html: headerFooterdata.footer }} />
                                    
                                </div>
                            )}


                        </div>
                    </div>
                    {/* end flex */}





                </div>
            </div>
        </>
  )
}

export default FilterPage