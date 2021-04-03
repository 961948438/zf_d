import React, { useEffect,useState } from 'react'
import './index.css'
import { NavBar, Icon, List, Button, Card,
  Popover, Toast, ActionSheet, Modal, Badge } from 'antd-mobile';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BASE_URL} from '../../comfuc/comenv'

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} 
className="am-icon am-icon-xs" alt="" />

// let wrapProps;
// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }


export default function Map(props) {
  
  let specifikItem = {
    "houseImg": "/newImg/7bioii390.jpg",
    "title": "整租 · 瑞都国际北区 2室1厅 5600元",
    "tags": [
        "近地铁",
        "精装",
        "集中供暖",
        "随时看房"
    ],
    "price": 5600,
    "desc": "二室/63/南/瑞都国际北区",
    "houseCode": "5cc465da1439630e5b428d13"
  }
  const [houseList, sethouseList] = useState([specifikItem])
  const [ismodalshow, setismodalshow] = useState(false)
  const [selected, setonSelected] = useState('')
  const [visible, setvisible] = useState(false)
  const [clicked, setclicked] = useState('none')

  const showHouseList = () => {
    setismodalshow(true)
  }

  const getHouseRoucer = (value) => {
    Toast.hide()
    Toast.info("初始化数据较慢", 100, null, false)
    axios.get(BASE_URL+ `/houses`,{
      params:{
        cityId: value
      }
    }).then(result => {
      Toast.hide()
      const {count,list} = result.data.body

      // showHouseList()
      sethouseList(list)
      setismodalshow(true)
    })
  }

  const handleVisibleChange = () => {
    
  }

  const onSelect = (opt) => {
    setvisible(false)
    setonSelected(opt.props.value)
    switch (opt.props.value){
      case "scan":
        return Toast.fail('获取不到设备权限',2,()=>null,false)
      case "qrcode":
        return Toast.fail('获取不到设备权限',2,()=>null,false)
      case "help":
        return Toast.fail('正在开放中',2,()=>null,false)
    }
  }

  

  const renderPropver = () => (
    <Popover mask
      overlayClassName="fortest"
      overlayStyle={{ color: 'currentColor' }}
      visible={visible}
      overlay={[
        (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
        (<Item key="5" value="qrcode" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>Qrcode</Item>),
        (<Item key="6" value="help" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
        <span style={{ marginRight: 5 }}>Help</span>
        </Item>),
      ]}
      align={{
        overflow: { adjustY: 0, adjustX: 0 },
        offset: [-10, 0],
      }}
      onVisibleChange={handleVisibleChange}
      onSelect={onSelect}
      >
      <div style={{
      height: '100%',
      padding: '0 15px',
      marginRight: '-15px',
      display: 'flex',
      alignItems: 'center',
      }}
      >
      <Icon type="ellipsis" />
      </div>
    </Popover>
  )
  
  const createCircle = (...args) => {
    const [{lat,lng},label,count,value,zoom] = args
    const opts ={
      position: new window.BMapGL.Point(lng,lat),
      offset: new window.BMapGL.Size(-30,-30)
    }
    const labels =  new window.BMapGL.Label("",opts)
    labels.setContent(
      `<div class="bubble">
      <p class="bubble_name">${label}</p>
      <p>${count}套</p>
      </div>`
    )
    labels.setStyle({
      color: 'rgb(255,255,255)',
      cursor: "pointer",
      border: "0px solid rgb(255,0,0)",
      padding: '0px',
      whiteSpace: "nowrap",
      fontSize: '12px',
      textAlign: 'center'
    })
    window.map.addOverlay(labels)
    labels.id = value
    labels.addEventListener("click",() => {
    window.map.centerAndZoom(new window.BMapGL.Point(lng,lat), zoom);
    window.map.clearOverlays()
    renderOverLays(value)
    Toast.hide()
    Toast.info("数据加载中", 100, null, false)
    })
    
  }

  const createRect = (...args) => {
    const [{lat,lng},label,count,value] = args
    const opts ={
      position: new window.BMapGL.Point(lng,lat),
      offset: new window.BMapGL.Size(-50,-30)
    }
    const labels =  new window.BMapGL.Label("",opts)
    labels.setContent(
      `<div class="label_rect">
        <span class="label_rect_name">${label}</span>
        <span class="label_rect_count">${count}套</span>
        <i class="arrow> </i>
      </div>`
    )
    labels.setStyle({
      color: 'rgb(255,255,255)',
      cursor: "pointer",
      border: "0px solid rgb(255,0,0)",
      padding: '0px',
      whiteSpace: "nowrap",
      fontSize: '12px',
      textAlign: 'center'
    })
    window.map.addOverlay(labels)
    labels.id = value
    labels.addEventListener("click",() => {
      getHouseRoucer(value)
    })
  }

  const getTypeAndZoom = () => {
    // 记得把map挂载window对象上
    const zoom =  window.map.getZoom()
    let nextZoom, type = [null,null]
    if (zoom >=10 & zoom <12){
      nextZoom = 13
      type = 'circle'
    } else if (zoom >=12 & zoom < 14) {
      nextZoom = 15
      type = "circle"
    } else if (zoom >14 & zoom <16) {
      type = "rect"
    }
    console.log(nextZoom)
    return {nextZoom,type}

  }

  const createOverLays = (...args) => {
    const [item,zoom,type] = args
    const {
      coord:{latitude,longitude},
      count,
      label,
      value
    } = item
    const position = new window.BMapGL.Point(longitude,latitude)
    let cargs = [position,label,count,value,zoom]
    if ( type === "circle" ) {
      createCircle(...cargs)
    } else {
      createRect(...cargs)
    }
  }

  const renderOverLays = async (id) => {
    Toast.hide()
    Toast.info("初始化数据较慢", 100, null, false)
    const res = await axios.get(BASE_URL + '/area/map',{
      params:{
        id
      }
    })
    Toast.hide()
    const data = res.data.body
    const {nextZoom,type} =  getTypeAndZoom()
    data.forEach(item => {
      createOverLays(item,nextZoom,type)
    })
  }


  useEffect( () => {
    
    const {label, value} = JSON.parse(localStorage.getItem('zfsj'))
    let map = new window.BMapGL.Map("container")
    window.map = map
    let myGeo = new window.BMapGL.Geocoder()
    myGeo.getPoint(label, function(point){
      if(point){
          map.centerAndZoom(point, 11);
          map.addOverlay(new window.BMapGL.Marker(point, {title: '北京市海淀区上地10街'}))
          map.addControl(new window.BMapGL.ScaleControl())  
          map.addControl(new window.BMapGL.ZoomControl())
          map.addControl(new window.BMapGL.LocationControl())
          map.addControl(new window.BMapGL.CityListControl())
          map.enableScrollWheelZoom(true)
          renderOverLays(value)
      }else{
          alert('您选择的地址没有解析到结果！');
      }
    }, label)
    return () => {}
  }, [])

  return (
    <div className='map'>
      {/* <div>1</div> */}
      <div className='navbar-map'>
      <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() =>props.history.go(-1) }
      rightContent={renderPropver()}
      >地图找房</NavBar>
      </div>
      <div id="container">
      </div>
      <Modal
        maskClosable={true}
          popup
          visible={ismodalshow}
          onClose={() => setismodalshow(false)}
          animationType="slide-up"
          afterClose={() => { console.log('afterClose'); }}
        >
          <List renderHeader={() => <div>房租列表</div>} className="popup-list">
           {
             houseList.map( item => (
              <Card onClick={() => 
                props.history.push(`/detail?id=${item.houseCode}`)
                }
              full key={item.houseCode} className="card_home">
                <Card.Body className="house_list_card_body">
                <div className="house_list_house_items_imgwrap">
                  <img className="house_list_house_items_imgwrap_img"
                  src={`http://localhost:8000/static${item.houseImg}`}
                  alt=""/>
                </div>
                  <div className='house_desc'>
                    <span className='house_desc_title'>{item.title}</span>
                    <span className="house_desc_bodycontent">
                      {item.desc}
                    </span>
                    <span className='house_desc_brade'>
                    </span>
                  </div>
                </Card.Body>

                <Card.Footer content={
                        
                        item.tags.length >=4 ?
                        item.tags.slice(0,4).map((itemi,index) => (
                          <Badge text={itemi} key={index}
                          style={{ zIndex: 1,
                            marginLeft: 12, padding: '0 3px', 
                          backgroundColor: '#21b68a', borderRadius: 2 }} />
                        )):
                        item.tags.map((itemi,index) => (
                          <Badge text={itemi} key={index}
                          style={{ zIndex: 1,
                            marginLeft: 12, padding: '0 3px', 
                          backgroundColor: '#21b68a', borderRadius: 2 }} />
                        ))
                      }
                extra={<div><span className="house_list_item_price">{item.price}</span> /月</div>} />
              </Card>
             ))
           }
          </List>
        </Modal>
    </div>
  )
}
