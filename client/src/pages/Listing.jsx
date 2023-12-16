import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle"

const Listing = () => {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    console.log(listing);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams()

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const listingId = params.id;
                setLoading(true);
                const res = await fetch(`/api/listing/getListing/${listingId}`);

                const data = await res.json();

                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchListing();
    }, [params.id])
    return (
        <main>




            {loading && <p className='text-center text-lg mt-5'>Loading...</p>}


            {error && <p className='text-center text-lg mt-5'> Something Went Wrong</p>}

            {
                listing && !loading && !error && (
                    <>
                        <Swiper navigation>
                            {
                                listing.imageUrls.map((url, i) => (
                                    <SwiperSlide key={i}>
                                        <div className='h-[550px]' style={{ background: `url(${url}) center no-repeat `, backgroundSize: "cover" }}>

                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </>
                )
            }

        </main>
    )
}

export default Listing