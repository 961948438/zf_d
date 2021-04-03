import React, { useEffect,useState } from 'react'
import { Carousel, Toast } from 'antd-mobile'
import  axios from 'axios'
import { Flex, WhiteSpace } from 'antd-mobile';
import Nav1 from '../assets/img/nav-1.png'
import Nav2 from '../assets/img/nav-2.png'
import Nav3 from '../assets/img/nav-3.png'
import Nav4 from '../assets/img/nav-4.png'
import Swiper1 from '../assets/img/swiper/1.png'
import Swiper2 from '../assets/img/swiper/2.png'
import Swiper3 from '../assets/img/swiper/3.png'
import { Grid ,WingBlank,SearchBar} from 'antd-mobile';
import {getCurrentCity} from '../comfuc/comfuc'
import {BASE_URL} from '../comfuc/comenv'
const PlaceHolder = ({ className ,value,img,linkto,history}) => {
  const handleclick = (linkto) => {
    history.push(linkto)
  }
  return (<div className={`${className} placeholder navimg`}  onClick={
    () =>(handleclick(linkto))
  }>
    <img src={img} alt=""/>
    <h3 >{value?value:'block'}</h3>
  </div>
)}


export default function IndexHome({history}) {
  // const [swipers, setswipers] = useState(['1', '2', '3'])
  const [, setimgHeight] = useState(176)
  const [, setisImgLoaded] = useState(false)
  const [groups, setgroups] = useState([])
  const [recentNews, setrecentNews] = useState([])
  const [currentCity, setcurrentCity] = useState()
  const swipers = [Swiper1,Swiper2,Swiper3]

  const renderNews = () => {
    return recentNews.map(item => (
      <div className="news-item" key={item.id}
      onClick={() => history.push('/detail?id=5cc44f4e1439630e5b3d7b39')}>
        <div className="imgwrap">
          <img src={`${BASE_URL}${item.imgSrc}`} alt=""/>
        </div>
        <Flex className='content' direction='column' justify='between'>
          <h4 className='title'>{item.title}</h4>
          <Flex className='info' justify='between'>
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  useEffect(() => {

    axios.get(BASE_URL+'/home/swiper').then(result =>{
      console.log(result)
      setisImgLoaded(true)
    }).catch(error => console.log(error))
    axios.get(BASE_URL+'/home/groups',{
      params:{
        area:'AREA%7C88cff55c-aaa4-e2e0'
      }
    }).then(result => {
      console.log(result)
      setgroups(result.data.body)
    }).catch(error => console.log(error))
    axios.get(BASE_URL+'/home/news',{
      params:{
        area:'AREA%7C88cff55c-aaa4-e2e0'
      }
    }).then(result => {
      console.log(result)
      setrecentNews(result.data.body)
    }).catch(error => console.log(error))
    getCurrentCity().then(result => {
      console.log(result)
      setcurrentCity(result.label)
    }).catch(error => console.log(error))
    
    return () => {

    }
  }, [])
  return (
    <>
      <div style={{position:'relative'}} className='img-box-home'>
        <Carousel
            autoplay={true}
            infinite
          >
            {swipers.map((item,index) => (
              <a
                key={index}
                href='#!'
                style={{ display: 'inline-block', width: '100%'}}
              >
                <img
                  src={item}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    setimgHeight('auto')
                  }}
                />
              </a>
            ))}
        </Carousel>
        
        <Flex className='search-box'>
          <Flex className='search'>
            <div className='location' onClick={()=>history.push('/citylist')}>
              <span className='name' maxLength={2}>{
              currentCity
              }</span>
              <i className='iconfont icon-arrow'></i>
            </div>
            <div className='form' onClick={() => history.push('/search')}>
              <SearchBar placeholder="Search" maxLength={8} style={{backgroundColor:'none'}} />
            </div>
          </Flex>
          <i className='iconfont icon-map'
          onClick={()=>history.push('/map')}></i>
        </Flex>
      </div>
      <WhiteSpace />
      <Flex justify="center">
        <PlaceHolder history={history} className="inline" 
        value='整租' img={Nav1} linkto='/home/list' />
        <PlaceHolder className="inline" value='合租' img={Nav2} 
        linkto='/home/list' history={history} />
        <PlaceHolder className="inline" value='地图找房' img={Nav3}
        linkto='/map' history={history}/>
        <PlaceHolder className="inline" value='去出租' img={Nav4}
        linkto='/rent/add' history={history}/>
      </Flex>
      
      <div className='groups'>
          <h4 className='title'>
              租房小组 <span 
              onClick={() => Toast.info("暂无更多",2,null,false)}
              className='more'>更多&gt;</span>
          </h4>
          <div className='grid_content'>
            <Grid data={groups} columnNum={2} hasLine={false} renderItem={
              (item) => <Flex 
              onClick={()=>history.push('/rent/add')}
              className="group-item" justify='around'>
              <div className='desc'>
                <p className='title'>{item.title}</p>
                <span className='info'>{item.desc}</span>
              </div>
              <img src={BASE_URL+ `${item.imgSrc}`}
                alt="">
              </img>
            </Flex>
            } />
          </div>
      </div>

      <div className='news'>
          <h4 className='group-title'>&nbsp;&nbsp;&nbsp;最新咨询</h4>
          <WingBlank size='lg'>
            {renderNews()}
          </WingBlank>
      </div>

    </>
  )
}
