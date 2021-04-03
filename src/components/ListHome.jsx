import { Icon,Card, Badge, Toast,Pagination } from 'antd-mobile'
import React,{useEffect,useState,useRef} from 'react'
import SearchBarFun from './com/SearchBar'
import Filter from './FilterCp/Filter/index'
import axios from 'axios'
import {BASE_URL} from '../comfuc/comenv'

const locale = {
  prevText: 'Prev',
  nextText: 'Next',
};

export default function ListHome(props) {
  
  const [houseList, sethouseList] = useState([])
  const [houseCount, sethouseCount] = useState(0)
  const [positionTitle, setpositionTitle] = useState('relative')
  const [isLoading, setisLoading] = useState(false)
  const [data1, setdata1] = useState(null)
  const [currentPage, setcurrentPage] = useState(1)
  const contentR = useRef('')
  useEffect(() => {
    document.querySelector('.home-content').addEventListener('scroll',(e) => {
      const scrollTop = e.target.scrollTop
      if (scrollTop >= 44) {
        setpositionTitle("fixed")
      }else {
        setpositionTitle("relative")
      }
    })
    handlefilter({})
    return () => {
    }
  }, [])

  
  const handlefilter = (data,start=1) => {
    setdata1(data)
    Toast.hide()
    Toast.loading("", 10, ()=>null, false)
    axios.get(BASE_URL+ '/houses',{
      params:{
        cityId: JSON.parse(localStorage.getItem("zfsj")).value,
        ...data,
        start:start,
        end:20
      }
    }).then(result => {
      sethouseList(result.data.body.list)
      sethouseCount(result.data.body.count)
      setisLoading(true)
      Toast.hide()
      console.log(result)
    })
  }

  const handleChange = (page) => {
    setcurrentPage(page)
    axios.get(BASE_URL + '/houses',{
      params:{
        cityId: JSON.parse(localStorage.getItem("zfsj")).value,
        ...data1,
        start:(page -1) * 20 +1,
        end:page * 20 
      }
    }).then(result => {
      console.log(result)
      sethouseList(result.data.body.list)
    })
  }

  return (
    <div ref={contentR} style={{overflow:'scroll'}}>
      <SearchBarFun>
      </SearchBarFun>
      <div style={{position:positionTitle,width:'100%',top:0,zIndex:2}}  >
        <Filter  onFilter={handlefilter}></Filter>
        </div>
      <div >
      {
        houseList.map( item => (
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
        ))
      }
      </div>
      <div className="class_patin_">
      {isLoading?<Pagination total={Math.ceil(houseCount/20)}
        className="custom-pagination-with-icon"
        current={currentPage <= Math.ceil(houseCount/20) ?currentPage:Math.ceil(houseCount/20) }
        onChange={handleChange}
        locale={{
          prevText: (<span className="arrow-align"
          ><Icon type="left" />上一步</span>),
          nextText: (<span className="arrow-align">下一步<Icon type="right" /></span>),
        }}
        />:''}
      </div>
    </div>
  )
}
