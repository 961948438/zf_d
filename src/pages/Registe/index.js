import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'
import axios from 'axios'
import {BASE_URL} from '../../comfuc/comenv'
import styles from './index.module.css'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{3,12}$/
class Registe extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
         user:"",
         password:"",
         reppassword:''
    }
  }
  
  handleinfouser = (e) => {
    console.log(e.target.value)
    this.setState({
      user:e.target.value
    })
  }
  handleinfopassword = (e) => {
    console.log(e.target.value)
    this.setState({
      password:e.target.value
    })
  }
  handleinfreppassword = (e) => {
    console.log(e.target.value)
    this.setState({
      reppassword:e.target.value
    })
  }
  handleSumit = (e) => {
    e.preventDefault()
    const {user,password,reppassword} = this.state
    console.log(" ===>",user,password,reppassword)
    if (user.trim().length ==0 || password.trim().length == 0 || reppassword.trim().length == 0) {
      Toast.info("内容不能为空",2,null,false)
      return 
    } else if (password !== reppassword) {
      Toast.info("两次输入密码不相等",2,null,false)
      return
    } else {
      axios.post(BASE_URL+'/user/registered',{
        username:user,
        password:password
      }).then(result => {
        if (result.data.status == 400){
          console.log(result)
          Toast.success("您的账号重复注册",2,() =>(1),false)
          return
        }
        console.log(result)
        Toast.success("注册成功",2,() =>(this.props.history.push('/home/my')),false)
      }).catch((err) => {
        console.log(err)
        Toast.fail("注册失败",2,null,false)
      })
    }
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>注册</NavHeader>
        <WhiteSpace size="xl" />
        <WingBlank>
          <form onSubmit={this.handleSumit}>
            <div className={styles.formItem}>
              <label className={styles.label}>用户名</label>
              <input className={styles.input} placeholder="请输入账号" 
              onInput={this.handleinfouser}/>
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>密码</label>
              <input
                className={styles.input}
                type="password"
                placeholder="请输入密码"
                onInput={this.handleinfopassword}
              />
            </div>
            <div className={styles.formItem}>
              <label className={styles.label}>重复密码</label>
              <input
                className={styles.input}
                type="password"
                placeholder="请重新输入密码"
                onInput={this.handleinfreppassword}
              />
            </div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                注册
              </button>
            </div>
          </form>
          <Flex className={styles.backHome} justify="between">
            <Link to="/home">点我回首页</Link>
            <Link to="/login">已有账号，去登录</Link>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Registe
