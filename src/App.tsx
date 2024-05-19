import { FormEventHandler, useState } from 'react';
import './app.css'
import Input from './components/Input'
import { Toaster, toast } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { create } from 'zustand';
import { Else, If, Then } from 'react-if';
import LoadingScreen from './components/LoadingScreen';

enum Pages {
  'sing_up',
  'greetings'
}

type State = {
  page: Pages
}

type Action = {
  updatePage: (page: State['page']) => void
}

const useStore = create<State & Action>((set) => ({
  page: Pages.sing_up,
  updatePage: (newPage: Pages) => set(() => ({ page: newPage })),
}))

function App() {
  const [animate, setAnimate] = useState(false)
  const page = useStore((state) => state.page)
  const updatePage = useStore((state) => state.updatePage)

  return (
    <div>
      <AnimatePresence>
        {
          animate && (
            <LoadingScreen />
          )
        }
      </AnimatePresence >
      
      <If condition={page === Pages.sing_up}>
        <Then>
          <SignUpPage setAnimate={setAnimate} updatePage={updatePage} />
        </Then>
        <Else>
          <Greetings setAnimate={setAnimate} updatePage={updatePage} />
        </Else>
      </If>

      <Toaster toastOptions={{
        style: {
          backgroundColor: 'darkslategray',
          color: 'whitesmoke',
          zIndex: 999
        }
      }} />
    </div>
  )
}

function SignUpPage({ setAnimate, updatePage }: { setAnimate: (newState: boolean) => void, updatePage: (page: Pages) => void }) {
  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    toast('Account Created')
    setAnimate(true)

    setTimeout(() => {
      setAnimate(false)
      updatePage(Pages.greetings)
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gray-800 font-inter px-12 py-8 sign_up_container relative">

      <img className='size-12' src='/pet.webp' alt='account page icon' />

      <h2 className='uppercase text-2xl font-semibold text-gray-400 mt-16'>Start for free</h2>
      <h1 className='text-4xl font-semibold text-gray-100 mt-2 font-dmsans'>Create New Account</h1>

      <p className='text-gray-400 mt-8'>Already Have an Account? <a className='text-teal-300' href="#">Sign In</a></p>

      <form onSubmit={onFormSubmit} className='flex flex-col flex-wrap mt-8 gap-y-4 sm:w-10 w-full flex-grow'>
        <div className='flex flex-col sm:flex-row gap-4 '>
          <Input required={true} name='first_name' label='First Name' />
          <Input required={true} name='last_name' label='Last Name' />
        </div>
        <Input required={true} name='email' autoComplete='email' label='Email' />
        <Input required={true} name='password' type='password' autoComplete='new-password' label='Password' />

        <button className='bg-teal-400 w-max px-5 py-3 rounded-full mt-8 font-semibold text-gray-900 hover:bg-teal-300 transition-colors' type='submit'>Create account</button>
      </form>
    </div>
  )
}

function Greetings ({ setAnimate, updatePage }: { setAnimate: (newState: boolean) => void, updatePage: (page: Pages) => void }) {
  const LogOut = () => {
    toast('Logged Out')
    setAnimate(true)

    setTimeout(() => {
      setAnimate(false)
      updatePage(Pages.sing_up)
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gray-800 font-inter px-12 py-8 greetings_container relative">
      <section className='flex w-full flex-row flex-nowrap justify-center items-center gap-x-24'>
        <h1 className='text-6xl text-gray-100 w-1/3 text-center'>Thanks for choosing SealSecurity</h1>
        <img src='/pet.webp' className='size-48' />
      </section>
      <p className='text-center text-lg text-gray-300 mt-4'>We're constantly trying to improve our platform and making it better for you.</p>

      <div className='flex justify-center mt-4'>
        <button onClick={LogOut} className='bg-teal-400 w-max px-5 py-3 rounded-full mt-8 font-semibold text-gray-900 hover:bg-teal-300 transition-colors' type='submit'>Log out</button>
      </div>
    </div>
  )
}

export default App
