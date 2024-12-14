"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SlLocationPin } from "react-icons/sl";
import {TbPointFilled} from "react-icons/tb"
import moment from 'moment';
import { useSearchParams,usePathname } from 'next/navigation'

const DesktopSearch = ({cityList,inputList}) => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const [startDate, setStartDate] = useState(new Date());

  const [desktoSearch, setDesktoSearch] = useState("");

  const [searchLat, setSearchLat] = useState("");
  const [searchLong, setSearchLong] = useState("");
  
  const [selectedList, setSelectedList] = useState("");

  const [filteredList,setFilteredList] = useState([])
  const [selectedCity, setSelectedCity] = useState(null);
  
  const [categoryValue,setCatagoryValue] = useState('')

  const cityOptions = cityList.map((city) => ({
    value: city.cityName.toLowerCase().replace(/ /g, '-'),
    label: city.cityName,
  }));
  const defaultCityOption = cityOptions[0];
  // console.log("defaultCityOption",defaultCityOption)

  const [serchError,setSearchError] = useState('')


  // console.log("startDate startDate startDate",startDate)
  // const handleSearchLatLong = (lat, long, location) => {
    
  //   setSelectedLocation(location);
  //   setSearchLat(lat);
  //   setSearchLong(long);
  //   //setDesktoSearch("");
  //   setDeskSearchdata([]);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/category-list`
  //       );
  //       setDeskSearchdata(response.data.category_list);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (desktoSearch) {
  //     fetchData();
  //   }
  // }, [desktoSearch]);

  // const searchUrlData = `/audio-studio?searchLocation-${selectedLocation}&searchlat=${searchLat}&searchlong=${searchLong}&from=search`;

// console.log("inputList",inputList)

  const staticStudio = [
    {
      "_id": "",
      "category_name": "Studio"
  }
  ]

  const newList = [...inputList, ...staticStudio]

const inputSearch = (e) => {
  let value = e.target.value
  setDesktoSearch(value)

  // Filter data based on search term
  const filteredResults = newList.filter((category) =>
  category.category_name.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredList(filteredResults)

}
// console.log("filteredList",filteredList)

// console.log("selectedCity",selectedCity)
console.log("selectedList",selectedList)
// console.log("desktoSearch",desktoSearch)

  const handleSearchList = (name,id) => {
    setSelectedList(name)
    setDesktoSearch(name);
    setCatagoryValue(id)
    setFilteredList([])
  }

  const handleSearch = () => {
    if (selectedCity != null && selectedList === '') {
      router.push(`/${selectedCity.value}?date=${moment(startDate).format('YYYY-MM-DD')}&city=${selectedCity.value}&from=search`)
    } else if ( selectedList === 'Studio' && selectedCity == null) {
      router.push(`/studio?date=${moment(startDate).format('YYYY-MM-DD')}&catagory=Studio&from=search`)
    } else if (selectedList === 'Studio' && selectedCity != null ) {
      router.push(`/${selectedCity.value}/studio?date=${moment(startDate).format('YYYY-MM-DD')}&city=${selectedCity.value}&catagory=Studio&from=search`)
    } else if (selectedList != 'Studio' && selectedCity == null) {
      router.push(`/creator?catagory=${selectedList}&catagoryid=${categoryValue}&date=${moment(startDate).format('YYYY-MM-DD')}&from=search`)
    } else if (selectedList != 'Studio' && selectedCity != null) {
      router.push(`/${selectedCity.value}/creator?catagory=${selectedList}&catagoryid=${categoryValue}&date=${moment(startDate).format('YYYY-MM-DD')}&city=${selectedCity.value}&from=search`)
    }
  };

  const searchBy = searchParams.get('from');
  const searchDate = searchParams.get('date');
  const searchText = searchParams.get('catagory');
  const searchLocation = searchParams.get('city');



  useEffect(() => {
      if (searchBy === "search") {
        //setStartDate(moment(searchDate).format('EEEE, dd MMMM yyyy'))
        setDesktoSearch(searchText || '')
        setSelectedCity({ value: searchLocation, label: searchLocation });

        const searchDateAsDate = new Date(searchDate);

      // Check if searchDateAsDate is a valid Date object
      if (!isNaN(searchDateAsDate.getTime())) {
        setStartDate(searchDateAsDate);
      }
      }
  }, [router])


  return (
    <>
      <div className="z-50 main__search__wrapper round flex flex-wrap mx-auto rounded-lg items-center relative">
        <div className="input__box flex items-center pe-4 relative">
          <input
            value={desktoSearch}
            onChange={inputSearch}
            type="text"
            name="search"
            id="search"
            className="form-control border-none"
            placeholder="Search your dream studios & creators"
            required
          />
          {serchError && <p>{serchError}</p>}
          <div className="absolute top-full z-50 text-left  overflow-y-auto max-h-[350px] 2xl:max-w-[570px] max-w-[470px] w-full pr-[10rem]">
          {/* {serchError && <p>{serchError}</p>} */}
            <div className="bg-white w-full">

              {filteredList &&
                filteredList.slice(0, 5).map((list, index) => {
                  if (
                    list.category_name === selectedList ||
                    desktoSearch === ""
                  ) {
                    return null; // Exclude the selected location from the displayed list
                  }
                  return (
                    <div key={index}>
                      <button
                        onClick={() =>
                          handleSearchList(
                            list.category_name,
                            list._id
                          )
                        }
                        className=" px-3 py-2 text-_dark text text-left transition-all duration-300 hover:bg-_gray-light w-full inline-flex items-center"
                      >
                        <TbPointFilled className="w-18" />{" "}
                        <span className="w-[calc(100%-18px)] pl-3 truncate">
                          {list.category_name}
                        </span>
                      </button>
                    </div>
                  );
                })}
               

            </div>
          </div>
 

          <div className={` select w-[50%] md:w-[130px] text-left`}>
            <Select
                options={cityOptions}
                onChange={(selectedOption) => setSelectedCity(selectedOption)}
                value={selectedCity}
                // defaultValue={defaultCityOption}
            />
        </div>
        </div>



        <div className="date__box">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="EEEE, dd MMMM yyyy"
            // dateFormat="yyyy-MM-dd"
            placeholderText="This has disabled keyboard navigation"
            minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)} // Set min date to tomorrow
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // Set max date to 30 days from now
          />
        </div>
        <div className="btn__box">
          <button
            onClick={handleSearch}
            className="btn p-3 bg-_green text-white w-full rounded-tr-lg rounded-br-lg"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

const MobileSearch = ({cityList,inputList}) => {
  const router = useRouter();
  const searchParams = useSearchParams();


  // const [startDate, setStartDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  const [startDate, setStartDate] = useState(new Date());

  const [desktoSearch, setDesktoSearch] = useState("");

  const [searchLat, setSearchLat] = useState("");
  const [searchLong, setSearchLong] = useState("");
  
  const [selectedList, setSelectedList] = useState("");

  const [filteredList,setFilteredList] = useState([])
  const [selectedCity, setSelectedCity] = useState(null);
  
  const [categoryValue,setCatagoryValue] = useState('')

  const cityOptions = cityList.map((city) => ({
    value: city.cityName.toLowerCase().replace(/ /g, '-'),
    label: city.cityName,
  }));

  const staticStudio = [
    {
      "_id": "studio",
      "category_name": "Studio"
  }
  ]

  const newList = [...inputList, ...staticStudio]

const inputSearch = (e) => {
  let value = e.target.value
  setDesktoSearch(value)

  // Filter data based on search term
  const filteredResults = newList.filter((category) =>
  category.category_name.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredList(filteredResults)

}
// console.log("filteredList",filteredList)

console.log("selectedCity",selectedCity)
console.log("selectedList",selectedList)
// console.log("desktoSearch",desktoSearch)

  const handleSearchList = (name,id) => {
    setSelectedList(name)
    setDesktoSearch(name);
    setCatagoryValue(id)
    setFilteredList([])
  }



  //console.log("mobSearchdata",mobSearchdata)

  const handleSearch = () => {
    if (selectedCity != null && selectedList === '') {
      router.push(`/${selectedCity.value}?date=${moment(startDate).format('YYYY-MM-DD')}&city=${selectedCity.value}&from=search`)
    } else if ( selectedList === 'Studio' && selectedCity == null) {
      router.push(`/studio?date=${moment(startDate).format('YYYY-MM-DD')}&catagory=Studio&from=search`)
    } else if (selectedList === 'Studio' && selectedCity != null ) {
      router.push(`/${selectedCity.value}/studio?date=${moment(startDate).format('YYYY-MM-DD')}&city=${selectedCity.value}&catagory=Studio&from=search`)
    } else if (selectedList != 'Studio' && selectedCity == null) {
      router.push(`/creator?catagory=${selectedList}&catagoryid=${categoryValue}&date=${moment(startDate).format('YYYY-MM-DD')}&from=search`)
    } else if (selectedList != 'Studio' && selectedCity != null) {
      router.push(`/${selectedCity.value}/creator?catagory=${selectedList}&catagoryid=${categoryValue}&date=${moment(startDate).format('YYYY-MM-DD')}&city=${selectedCity.value}&from=search`)
    }
  };


  const searchBy = searchParams.get('from');
  const searchDate = searchParams.get('date');
  const searchText = searchParams.get('catagory');
  const searchLocation = searchParams.get('city');



  useEffect(() => {
      if (searchBy === "search") {
        //setStartDate(moment(searchDate).format('EEEE, dd MMMM yyyy'))
        setDesktoSearch(searchText || "")
        setSelectedCity({ value: searchLocation, label: searchLocation });

        const searchDateAsDate = new Date(searchDate);

      // Check if searchDateAsDate is a valid Date object
      if (!isNaN(searchDateAsDate.getTime())) {
        setStartDate(searchDateAsDate);
      }
      }
  }, [router])


  return (
    <div className="mobile__search__box pt-4 pb-1 relative z-50">
      <div className="w-full max-w-[600px] mx-auto">
        <p className="text-sm sm:text-base text-_dark font-semibold text-center mb-3">
          Recording Studios & Audio Creators
        </p>
        <div className="flex flex-wrap border border-border-color rounded-[10px]">
          <div className="w-full relative">
            <input
              value={desktoSearch}
              onChange={inputSearch}
              type="text"
              name="search"
              id="search"
              className="form-control border-0"
              placeholder="Search your dream studios & creators"
              required
            />
            <div className="absolute top-full w-full text-left bg-white overflow-y-auto max-h-[350px] shadow-lg rounded-lg" style={{zIndex: '999'}}>
              <div className="">
              {filteredList &&
                filteredList.slice(0, 5).map((list, index) => {
                  if (
                    list.category_name === selectedList ||
                    desktoSearch === ""
                  ) {
                    return null; // Exclude the selected location from the displayed list
                  }
                  return (
                    <div key={index}>
                      <button
                        onClick={() =>
                          handleSearchList(
                            list.category_name,
                            list._id
                          )
                        }
                        className=" px-3 py-2 text-_dark text text-left transition-all duration-300 hover:bg-_gray-light w-full inline-flex items-center"
                      >
                        <TbPointFilled className="w-18" />{" "}
                        <span className="w-[calc(100%-18px)] pl-3 truncate">
                          {list.category_name}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={` select w-[50%] border-r xl:border-r-0`}>
                    <Select
                      value={selectedCity}
                      options={cityOptions}
                      onChange={(selectedOption) => setSelectedCity(selectedOption)}

                    />
                </div>
          <div className="w-[50%] date__picker lg:border-l border-border-color z-50">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="EEEE, dd MMM"
              placeholderText="This has disabled keyboard navigation"
              className=" rounded-bl-xl z-50"
              minDate={new Date()} // Set min date to tomorrow
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // Set max date to 30 days from now
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="btn p-3 font-semibold text-[13px] sm:text-base bg-_green text-white w-full rounded-lg mt-4"
        >
          Search
        </button>
      </div>
    </div>
  );
};

const Search = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [cityList,setCityList] = useState([])
  const [inputList,setInputList] = useState([])

  useEffect(() => {
    const getCity = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/city-list`
        );
        
        const sortedCityList = response.data.sort((a, b) => a.cityName.toLowerCase().localeCompare(b.cityName.toLowerCase()));
        setCityList(sortedCityList)
      } catch (error) {
        console.error(error);
      }
    };
    getCity()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category-list`
        );
        setInputList(response.data.category_list);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  

  if (isMobile) {
    return (
      <>
        <MobileSearch cityList={cityList} inputList={inputList} />
      </>
    );
  }

  return <DesktopSearch cityList={cityList} inputList={inputList} />;

  // if (typeof window !== "undefined") {
  // const screen__width = window.innerWidth;
  // }
  // console.log('screen-size: ', screen__width);

  // return (
  //     <>
  //         {
  //             screen__width < 1024 ? <MobileSearch /> : <DesktopSearch />
  //         }

  //     </>
  // )
};
export default Search;
