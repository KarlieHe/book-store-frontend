import bannerImg from '../../assets/banner.png'

const Banner = () => {
  return (
    <div className='flex md:flex-row-reverse flex-col justify-between items-center gap-20 pt-8'>

        <div className='md:w-2/4 w-full flex md:justify-end justify-center items-center'>
            <img src={bannerImg} alt='Banner Image' />
        </div>

        <div className='md:w-2/4 w-full md:text-left  text-center'>
            <h1 className='text-5xl text-secondary font-bold font-primary mb-6'>
                New Releases This Week
            </h1>
            <p className='text-sm font-primary mb-6'>
                It&apos;s time to update your reading list with some of the latest and greatest releases in the literary world. 
                From heart-pumping thrillers to captivating memoirs, this week&apos;s new releases offer something for everyone
            </p>
            <button className='btn-primary text-textColorForDarkBG'>Subscribe</button>
        </div>

    </div>
  )
}

export default Banner
