import React, {useState,useEffect} from 'react'
import NavHeader from '../../components/NavHeader/index'
import {API,getToken} from '../../comfuc/comfuc'
import {BASE_URL} from '../../comfuc/comenv'
import {Card,Badge,Result} from 'antd-mobile'
import styles from './index.module.css'
export default function Favorate(props) {
  const [favorate, setfavorate] = useState([])
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    API.get(BASE_URL + '/user/favorites',{

      headers:{
       Authorization : getToken()
      }
    }).then(r=> {
      setfavorate(r.data.body)
      setisLoading(false)
    })
    return () => {}
  }, [])

  const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
  return (
    <div className={styles.content}>
      
      <div className={styles.fav_navbar}>
        <NavHeader>我的收藏列表</NavHeader>
      </div>
      {
        isLoading? "":
        favorate.length !==0?
        favorate.map( item => (
          <Card onClick={() => 
            props.history.push(`/detail?id=${item.houseCode}`)
            }
          full key={item.houseCode} className="card_home">
            <Card.Body className="house_list_card_body">
              <div className="house_list_house_items_imgwrap">
                <img className="house_list_house_items_imgwrap_img"
                src={BASE_URL+`${item.houseImg}`}
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
        )):
        <Result
        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg')}
        title="暂无收藏"
        message=""
      />
      }
      
    </div>
  )
}
