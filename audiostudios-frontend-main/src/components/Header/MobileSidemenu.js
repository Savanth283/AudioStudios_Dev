import React from 'react'
import styles from './styles.module.scss'
import { Accordion } from "flowbite-react";
import Link from 'next/link';

const MobileSidemenu = ({menuList}) => {
  return (
    <>
    <ul className='mt-4'>
     {menuList && menuList.length != 0 && menuList?.slice(0,8)?.map((menu,index)=> {
            return (
              <li className='mb-3' key={index}>
    <Link href={`/${menu.cityName.toLowerCase().replace(/ /g, '-')}`} >
                {menu.cityName}
                </Link>

              </li>
            )})}

    </ul>

    {/* <Accordion alwaysOpen={false} flush={true}>
    {menuList && menuList.length != 0 && menuList?.slice(0,8)?.map((menu,index)=> {
            return (
        <Accordion.Panel key={index}>
                <Accordion.Title className={`${styles.acc__header}`}>
                <Link href={`/audio-studio?location=${menu.cityId}`} >
                {menu.cityName}
                </Link>
                
                </Accordion.Title>
                <Accordion.Content className={`${styles.acc__body}`}>
                  <ul className={``}>

                    <li>
                      <Link
                        href="/studiodetail/"
                        className={`${styles.dropdown__item} text-base py-2 text-_dark transition block hover:bg-__gray-light`}
                      >
                        Link Name
                      </Link>
                    </li>

                    
                  </ul>
                </Accordion.Content>
        </Accordion.Panel>
            )})}

    </Accordion> */}
    </>
  )
}

export default MobileSidemenu