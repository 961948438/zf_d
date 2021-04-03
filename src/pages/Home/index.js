import './index.css'
import React,{useState,useEffect} from 'react'
import { TabBar } from 'antd-mobile'
import {Route} from 'react-router-dom'
// import Base  from '../../components/Base'
import IndexHome from '../../components/IndexHome'
import ListHome  from '../../components/ListHome'
import MyHome from '../../components/MyHome'
import NewsHome from '../../components/NewsHome'
import Profile from '../../components/Profile'

// 导航栏重构
// const tabBarData = [
//   {
//     title:"首页",
//     path:'/home/',
//     iconClass:'iconfont icon-ind'
//   },
//   {
//     title:"找房",
//     path:'/home/list',
//     iconClass:'iconfont icon-findHouse'
//   },
//   {
//     title:"资讯",
//     path:'/home/news',
//     iconClass:'iconfont icon-infom'
//   },
//   {
//     title:"我的",
//     path:'/home/my',
//     iconClass:'iconfont icon-my'
//   },
// ]
// {tabBarData.map(({iconClass,title,path}) => (
//   <TabBar.Item
//   icon={<i className={iconClass}></i>}
//   selectedIcon={<i className={iconClass}></i>}
//   title={title}
//   key={title}
//   selected={selectedTab === path}
//   onPress={() => {
//       setselectedTab(path)
//       props.history.push(path)
//   }}
//   >
//   </TabBar.Item>))}

export default function Home (props) {
  const pathname = props.location.pathname
  const [selectedTab, setselectedTab] = useState(pathname)
  
  useEffect(() => {
    if (selectedTab !== pathname){
      setselectedTab(pathname)
    }
    return () => {}
  })
  return (
    <div className='route-home'>
        <div className='home-content'>
          <Route path='/home/' component={IndexHome} exact />
          <Route path='/home/list' component={ListHome} />
          <Route path='/home/news' component={NewsHome} />

          <Route path='/home/my' component={Profile}></Route>
        </div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="rgb(10,166,102)"
          barTintColor="white"
          className='box_tabbar'
          noRenderContent
        >
          {/*  */}
          <TabBar.Item
            title="首页"
            key="index"
            icon={ <i className='iconfont icon-ind'></i>
            }
            selectedIcon={<i className='iconfont icon-ind'></i>
            }
            badge={'new'}
            selected={selectedTab === '/home/'}
            onPress={() => {
              setselectedTab('/home/')
              props.history.push('/home/')
            }}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className='iconfont icon-findHouse'></i>
            }
            selectedIcon={
              <i className='iconfont icon-findHouse'></i>
            }
            title="找房"
            key="apartment_hunting"
            
            badge={100}
            selected={selectedTab === '/home/list'}
            onPress={() => {
              setselectedTab('/home/list')
              props.history.push('/home/list')
            }}
            data-seed="logId1"
          >
          </TabBar.Item>
          
          <TabBar.Item
            icon={<i className='iconfont icon-my'></i>}
            selectedIcon={<i className='iconfont icon-my'></i>}
            title="我的"
            key="my"
            selected={selectedTab === '/home/my'}
            onPress={() => {
                setselectedTab('/home/my')
                props.history.push('/home/my')
            }}
          >
          </TabBar.Item>
        </TabBar>
    </div>
  )
}


