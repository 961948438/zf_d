import './App.css'
import 'antd-mobile/dist/antd-mobile.css'
import 'react-virtualized/styles.css'
import Home from './pages/Home/index.js'
import CityList from './pages/CityList/index'
import {BrowserRouter as Router,Redirect,Route} from 'react-router-dom'
import Map from './pages/Map/index'
import Detail from './pages/Detail'
import Login from './pages/Login'
import Registe from './pages/Registe'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import Search from './pages/Rent/Search'
import Favorate from './pages/Favorate'
import EditMy from './pages/EditMy'

function App() {
  return (
    <Router className='boder' >
          <Route exact path='/'
          render={()=><Redirect to='/home'></Redirect>}
          ></Route>
          <Route path='/home' component={Home} ></Route>
          <Route path='/citylist' component={CityList}></Route>
          <Route path='/map'  component={Map}></Route>
          <Route path='/detail' component={Detail}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/registe' component={Registe}></Route>
          <Route path="/rent" exact component={Rent}></Route>
          <Route path="/rent/add" component={RentAdd}></Route>
          <Route path='/rent/search' component={Search}></Route>
          <Route path='/favorate' component={Favorate}></Route>
          <Route path='/editmy' component={EditMy}></Route>
    </Router>
  )
}

export default App;
