import Main from '../../pages/Main'
import Navbar from '../Navbar/Navbar'
import Notes from './Notes'

export default function Layout() {
  return (
    <div>
        <Navbar buttonName={'Logout'} />
        <Main />
        <Notes />
    </div>
  )
}
