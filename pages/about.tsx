import React from 'react'
import Head from 'next/head'

const about = () => {
  return (
    <>
        <Head>
            <title>about cuteastros</title>
        </Head>
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className='about__content about__card p-4 rounded-lg w-4/5 md:w-4/12'>
                <h1 className='heading text-xl font-bold text-white'>about technomemes</h1>
                <p className='body-font mt-4 text-white'>A hall of memes articulating witness various moving parts in our tech revolution.</p>
                <div>
                    <p className='mt-6 body-font'>made with ❤️ by web3gm</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default about