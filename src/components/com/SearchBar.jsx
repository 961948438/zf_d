import React from 'react'
import {Flex, SearchBar}  from 'antd-mobile'
import { withRouter } from 'react-router'
import styles from './index.module.css'
import { Icon } from 'antd-mobile'


function SearchBarFun({history}) {
  const {label} = JSON.parse(localStorage.getItem('zfsj'))
  return (
    <div>
      <div className={styles.head_search_bar_}>
      
        <Flex className={styles['search-box']}>
            <Flex className={styles.search}>
            <Icon type="left" className={styles.tohome_ico}
            onClick={()=>history.push('/home')}></Icon>
              <div className={styles.location} onClick={() => history.push('/citylist')}>
                <span className={styles.name} maxLength={2}>{
                  label
                }</span>
                <i className={'iconfont icon-arrow'}></i>
              </div>
              <div className={''} onClick={() => null}>
                <SearchBar className={styles['search-btn']}
                 placeholder="Search" maxLength={8} style={{backgroundColor:'none'}} />
              </div>
            </Flex>
            <i className={'iconfont icon-map icon_map'}
            onClick={() => history.push('/map')}></i>
          </Flex>
      </div>
    </div>
  )
}

export default withRouter(SearchBarFun)