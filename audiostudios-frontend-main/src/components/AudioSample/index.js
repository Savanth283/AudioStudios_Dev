import React from 'react'
import styles from './styles.module.scss'
import { IoPlay } from 'react-icons/io5'
import {AiFillFilePdf} from 'react-icons/ai'

const AudioSample = ({sample}) => {
    // console.log("sample",sample)
  return (
    <div className='p-3 md:p-4 lg:p-5 bg-white rounded-md'>
        <ul className='grid  gap-1'>
            {sample.category_name && (
            <li className={styles.list__item}>
                Category : <span className="text-_dark ps-1">{sample.category_name}</span>
            </li>
            )}

                {sample.language_name && (
            <li className={styles.list__item}>
                Language : <span className="text-_dark ps-1">{sample.language_name}</span>
            </li>
                )}

                    {sample.sub_category_name && (
            <li className={styles.list__item}>
                Sub category : <span className="text-_dark ps-1">{sample.sub_category_name} </span>
            </li>
                    )}

                        {sample.genres_name && (
            <li className={styles.list__item}>
                Genres : <span className="text-_dark ps-1">{sample.genres_name}</span>
            </li>
                        )}
        </ul>
        {/*  className="rounded-3xl p-3 lg:p-4 bg-_gray-light" */}
        {sample.file_type === "audio" && sample.audio_file && (
        <div className='mt-3'>
            <audio controls id="tts-audio">
            <source src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + sample.audio_file} type="audio/mpeg" />
            </audio>
        </div>
        )}
        {/* for pdf */}
        {sample.file_type === "pdf" && sample.audio_file && (
        <div className='mt-3'>
            <div className='h-[100px] w-[100-px]'>
            <a href={process.env.NEXT_PUBLIC_S3_BUCKET_URL + sample.audio_file} target='_blank'>
            <AiFillFilePdf className='text-4xl'/>
            </a>
            </div>
            {/* <audio controls id="tts-audio">
            <source src={process.env.NEXT_PUBLIC_S3_BUCKET_URL + sample.audio_file} type="audio/mpeg" />
            </audio> */}
        </div>
        )}
    </div>
  )
}

export default AudioSample