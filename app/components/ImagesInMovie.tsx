'use client'
import { getImageUrl } from "@/app/utils/utils"
import React, { useState } from 'react'
import type { Image } from "@prisma/client";

const ImagesInMovie = ({ images }: {images: Image[] | null}) => {

    const [isMore , setIsMore] = useState(false)

    if(!images || images.length === 0) return null


    return (
        <section className="my-20">
            {/* section header */}
            <div className="w-[81%] mx-auto flex items-center justify-end flex-row-reverse gap-5">
                <button className="text-black text-xl font-semibold bg-secondary hover:bg-success rounded-xl cursor-pointer px-3 py-2"
                    onClick={() => setIsMore(!isMore)}>{isMore ? 'عرض اقل' : 'عرض المزيد'}</button>
                <div >
                    <h2 className="text-5xl text-text font-extrabold mb-2">الصور</h2>
                    <h5 className="text-base text-muted-text font-normal">اتفرج على صور من المشاهد المميزة</h5>
                </div>
                <div className="w-3 h-20 bg-primary self-stretch"></div>
            </div>
            <div className="flex items-start justify-end flex-row-reverse gap-5 flex-wrap w-[81%] mx-auto mt-10">
                {
                    images.slice(0 , isMore ? images.length : 3).map((image: Image) => (
                        <img
                            key={image.id}
                            src={getImageUrl(image.path)}
                            className="h-[300px] background-cover background-center rounded-xl cursor-pointer"
                            alt=""
                        >
                        </img>
                    ))
                }
            </div>
        </section>
    )
}

export default ImagesInMovie