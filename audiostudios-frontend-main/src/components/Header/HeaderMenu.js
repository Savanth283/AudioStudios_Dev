"use client"
import React,{useEffect,useState} from 'react'

import Link from 'next/link'
import styles from './styles.module.scss';



const HeaderMenu = ({menuList}) => {


    
  return (
    <>
        {menuList && menuList.length != 0 && menuList.slice(0,8).map((menu,index)=> {
            //console.log("menu",menu)
            return (
        <li key={index} className={`${styles.dropdown} mx-3 md:mx-3 xl:mx-4 2xl:mx-6 relative`}>
        <Link href={`/${menu.cityName.toLowerCase().replace(/ /g, '-')}`} className={`${styles.nav_link} p-3`}>
            {menu.cityName}
        </Link>
            {/* <ul className={`${styles.dropdown__menu}`}>
                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
                <li><Link href='/studiodetail/' className={`${styles.dropdown__item} text-base px-3 py-2 text-_dark transition block hover:bg-__gray-light`}>Link Name</Link></li>
            </ul> */}
        </li>              
            )
        })}

    </>
  )
}

export default HeaderMenu