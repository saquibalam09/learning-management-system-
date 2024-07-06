import React from 'react'
import HomeLayout from '../Layouts/HomeLayout';
import AboutMain from '../Assets/Images/aboutMainImage.png'
import { Celebrities } from '../Constant/CelebrityData';

import CarouselSlide from '../Components/CarouselSlide';

function AboutUs() {

    
    return (
        <>
            <HomeLayout>
                <div className='pl-20 pt-20 flex flex-col text-white'>
                    <div className='flex items-center gap-5 mx-10'>
                        <section className='w-1/2 space-y-10'>
                            <h1 className='text-5xl text-yellow-500 font-semibold'>
                                Affordable and quality education
                            </h1>
                            <p className='text-xl text-gray-200'>
                                Our goal is to provide the best affordable and quality education to the world.
                                We are providing the platform the aspiring teachers and students to share 
                                their skills, creativity and knowledge to each other to empower and contribute
                                in the growth and wellness of mankind.
                            </p>

                        </section>
                        <div className='w-1/2'>
                            <img
                                id='test1'
                                style={{
                                    filter: 'drop-shadow(0px 10px 10px rgb(0, 0, 0))'
                                }}
                                alt='about main image'
                                className='drop-shadow-2xl'
                                src={AboutMain}
                            />
                        </div>

                    </div>
                    

                    <div className="carousel w-1/2 my-16 m-auto">
                      
                      
                        {Celebrities && Celebrities.map(celebrity => <CarouselSlide {...celebrity} key={celebrity.slideNumber} totalSlides={Celebrities.length}/>)}

                      
                      {/* <div id="slide1" className="carousel-item relative w-full">
                        <div className='flex flex-col  items-center justify-center gap-4 px-[15%]'>
                            <img
                              src={apj}
                              className="w-40 rounded-full border-2 border-gray-400" />
                            <p className='text-xl text-gray-200'>"You have to dream before your dreams can come true."</p>

                            <h1 className='text-2xl font-semibold'>APJ Abdul Kalam Azad</h1>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide5" className="btn btn-circle">❮</a>
                              <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                      </div> */}
                      {/* <CarouselSlide  img={apj} quote={"“You have to dream before your dreams can come true.”"} name={"APJ Abdul Kalam Azad"} slideNumber={1} totalSlides={5}/>
                      <div id="slide2" className="carousel-item relative w-full"> */}
                        {/* <div className='flex flex-col  items-center justify-center gap-4 px-[15%]'>
                            <img
                              src={billGates}
                              className="w-40 rounded-full border-2 border-gray-400" />
                            <p className='text-xl text-gray-200'>“It's fine to celebrate success but it is more important to heed the lessons of failure.”</p>
                            <h1 className='text-2xl font-semibold'>Bill Gates</h1>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide1" className="btn btn-circle">❮</a>
                              <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div> */}
                        {/* <CarouselSlide img={billGates} quote={"“It's fine to celebrate success but it is more important to heed the lessons of failure.”"} name={"Bill Gates"} slideNumber={2} totalSlides={5}/>
                      </div>
                      <div id="slide3" className="carousel-item relative w-full"> */}
                        {/* <div className='flex  flex-col items-center justify-center gap-4 px-[15%]'>
                            <img
                              src={einstein}
                              className="w-40  rounded-full border-2 border-gray-400" />
                            <p className='text-xl text-gray-200'>“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”</p>
                            <h1 className='text-2xl font-semibold'>Albert Einstein</h1>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide2" className="btn btn-circle">❮</a>
                              <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div> */}
                        {/* <CarouselSlide img={einstein} quote={"“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”"} name={"Albert Einstein"} slideNumber={3} totalSlides={5}/>
                      </div>
                      <div id="slide4" className="carousel-item relative w-full"> */}
                        {/* <div className='flex flex-col  items-center justify-center gap-4 px-[15%]'>
                            <img
                              src={nelsonMandela}
                              className="w-40 rounded-full border-2 border-gray-400" />
                            <p className='text-xl text-gray-200'>“Do not judge me by my successes, judge me by how many times I fell down and got back up again.”</p>
                            <h1 className='text-2xl font-semibold'>Nelson Mandela</h1>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide3" className="btn btn-circle">❮</a>
                              <a href="#slide5" className="btn btn-circle">❯</a>
                            </div>
                        </div> */}
                        {/* <CarouselSlide img={nelsonMandela} quote={"“Do not judge me by my successes, judge me by how many times I fell down and got back up again.”"} name={"Nelson Mandela"} slideNumber={4} totalSlides={5}/>
                      </div>
                      <div id="slide5" className="carousel-item relative w-full"> */}
                        {/* <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                            <img
                              src={steveJobs}
                              className="w-40 rounded-full border-2 border-gray-400" />
                            <p className='text-xl text-gray-200'>“Innovation distinguishes between a leader and a follower.”</p>
                            <h1 className='text-2xl font-semibold'>Steve Jobs</h1>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                              <a href="#slide4" className="btn btn-circle">❮</a>
                              <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div> */}
                        {/* <CarouselSlide img={steveJobs} quote={"“Innovation distinguishes between a leader and a follower.”"} name={"Steve Jobs"} slideNumber={5} totalSlides={5}/>
                      </div> */}
                    </div>

                </div>
            </HomeLayout>
        </>
    );
};

export default AboutUs;
