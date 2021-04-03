import React, { useEffect, useState,useRef } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import './index.css'
import axios from 'axios'
import {getCurrentCity} from '../../comfuc/comfuc'
import {List,AutoSizer}  from  'react-virtualized'
import {Toast} from 'antd-mobile'
import {BASE_URL} from '../../comfuc/comenv'
const handleData = (data) => {
  if (data === "#") {
    return "当前定位"
  }
  if (data === "hot")  {
    return "热名城市"
  }
  return data.toUpperCase()
}




export default function CityList(props) {

  const formatCityDat = (list) =>{
    const cityList = {}
    console.log(list)
    if (!list) {
      return null
    }
    list.forEach(item => {
      const first = item.short[0]
      if (cityList[first]){
        cityList[first].push(item)
      } else {
        cityList[first] = [item]
      }
    })
    const cityIndex = Object.keys(cityList).sort()
    return {
      cityList: cityList,
      cityIndex: cityIndex 
    }
  }

  const renderRow = (props) => {
    const {key,style,index} = props
    return (
      <div key={key} style={style} className='render_city'>
        <div className="title">{handleData(cityIndex[index])}</div>
        <div className='name'>
          {handlelistData(cityList[cityIndex[index]])}
        </div>
      </div>
    )
  }
  const getHeight = (props) => {
    const height = 30 + 50*cityList[cityIndex[props['index']]].length
    return height
  }

  const renderCityIndex = () => {
    return cityIndex.map((item,index) => {
      return (
        <li className='city-index-item' key={item}
        onClick={()=>{
          refindex.current.scrollToRow(index)
        }}>
          <div className={activeIndex ===index?'index-active':''}
          >{item ==="hot"?'!':item}</div>
        </li>
      )
    })
  }

  const handleHignLignt = (prop) => {
    const {startIndex} = prop
    if (activeIndex !== startIndex) {
      setactiveIndex(startIndex)
    }
  }

  const handlelistData = (data) => {
    return  data.map(item => {
      return (
        <div className='title_item' key={item.value}
        onClick={()=>changeCity(item)}>
          {item.label}
        </div>
      )
    })
  }

  const changeCity = (item) =>{
    const allowCity = ["北京","上海","广州","深圳"]
    if (allowCity.indexOf(item.label) > -1) {
      localStorage.setItem('zfsj',JSON.stringify(item))
      Toast.loading('Loading...', 1, () => {
        props.history.go(-1)
      });
      
    } else {
      Toast.fail('暂收集有北上广深的数据!!!', 3)
    }
  }
  
  const [cityList, setcityList] = useState({})
  const [cityIndex, setcityIndex] = useState([])
  const refindex = useRef(0)
  const [activeIndex, setactiveIndex] = useState(0)
  useEffect( async () => {
    const result1 = await axios.get(BASE_URL+ '/area/city',{
      params:{
        level:1
      }
    })
    const {cityList,cityIndex}  = formatCityDat(result1.data.body)
    const result2 = await axios.get(BASE_URL+ '/area/hot')
    cityList['hot'] = result2.data.body 
    cityIndex.unshift('hot')
    const result3 = await getCurrentCity()
    cityList['#'] = [result3]
    cityIndex.unshift('#')
    setcityList(cityList)
    setcityIndex(cityIndex)
    return () => {}
  }, [])

  return (
    <div className='citylist_'>
      <NavBar
      className='navbar'
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() =>{
        props.history.go(-1)
      }}>
        城区选择
      </NavBar>
      <AutoSizer style={{height:'100%',width:'100%'}}>
        {
          ({width,height}) => (
            <List 
            ref={refindex}
            autoContainerWidth
            height={height}
            width={width}
            rowCount={cityIndex.length}
            rowHeight={getHeight}
            rowRenderer={renderRow}

            onRowsRendered={handleHignLignt}
            >
            </List>
            )
        }
      </AutoSizer>
      <ul className='city-index'>
        {renderCityIndex()}
      </ul>
    </div>
  )
}
